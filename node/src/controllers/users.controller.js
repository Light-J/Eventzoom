import express from 'express';
import passport from 'passport';
import validator from '../middleware/validator';
import User from '../models/user.model';
import isNotSsoUser from '../middleware/isNotSsoUser';
import userService from '../services/user.service';
import passportJs from '../services/passport.service';
import clientConfig from '../../config/client';
import eventService from '../services/event.service';

const router = express.Router();

router.post(
	'/',
	validator('required', { field: 'email' }),
	validator('regex', { regex: /[^@]+@[^.]+\..+/, field: 'email' }),
	validator('required', { field: 'password' }),
	validator('sameAs', { field: 'password', otherField: 'passwordConfirmation' }),
	validator('validModel', { model: User }),
	async (req, res) => {
		await userService.createUser(req.validated);
		res.json({ success: true });
	},
);

router.get('/me', passport.authenticate('jwt'), async (req, res) => {
	res.json({ user: req.user });
});

router.put('/me', passport.authenticate('jwt'), isNotSsoUser,
	validator('required', { field: 'email' }),
	validator('required', { field: 'name' }),
	validator('optional', { field: 'phoneNumber' }),
	async (req, res) => {
		try {
			await userService.setUserProfileById(req.user.id, req.validated);
		} catch (e) {
			return res.json({ success: false });
		}

		const user = await userService.getUserById(req.user.id);
		await new Promise(((resolve, reject) => {
			req.login(user, (err, data) => {
				if (err) reject(err);
				else resolve(data);
			});
		}));
		return res.json({ success: true, user });
	});

router.delete('/me/phone-number',
	passport.authenticate('jwt'),
	isNotSsoUser,
	async (req, res) => {
		try {
			await userService.setUserProfileById(req.user.id, { phoneNumber: undefined });
			return res.json({ success: true });
		} catch (e) {
			return res.json({ success: false });
		}
	});

router.put('/me/password', passport.authenticate('jwt'), isNotSsoUser,
	validator('required', { field: 'currentPassword' }),
	validator('correctPassword', { field: 'currentPassword' }),
	validator('required', { field: 'newPasswordConfirmation' }),
	validator('required', { field: 'newPassword' }),
	validator('sameAs', { field: 'newPassword', otherField: 'newPasswordConfirmation' }),
	async (req, res) => {
		await userService.setUserPasswordById(req.user.id, req.body.newPassword);
		res.json({ success: true });
	});

router.post(
	'/login',
	passport.authenticate('local'),
	async (req, res) => {
		if (req.user.mfaEnabled) {
			return res.json({
				success: true,
				mfaRequired: true,
			});
		}
		return res.json({
			success: true,
			token: await passportJs.getJwtToken(req.user.id),
			user: req.user,
		});
	},
);

router.post(
	'/login-mfa',
	passport.authenticate('local'), passport.authenticate('totp'),
	async (req, res) => res.json({
		success: true,
		token: await passportJs.getJwtToken(req.user.id),
		user: req.user,
	}),
);

router.post('/forgotten-password',
	validator('required', { field: 'email' }),
	async (req, res) => {
		try {
			await userService.sendResetPasswordEmail(req.body.email);
			res.json({ success: true });
		} catch (e) {
			res.status(400).json({ success: false });
		}
	});

router.post('/reset-password',
	validator('required', { field: 'token' }),
	validator('required', { field: 'newPasswordConfirmation' }),
	validator('required', { field: 'newPassword' }),
	validator('sameAs', { field: 'newPassword', otherField: 'newPasswordConfirmation' }),
	async (req, res) => {
		try {
			await userService.resetPassword(req.body.token, req.body.newPassword);
			res.json({ success: true });
		} catch (e) {
			res.status(400).json({ success: false });
		}
	});

router.post('/resend-verification',
	validator('required', { field: 'email' }),
	async (req, res) => {
		try {
			await userService.resendVerificationEmail(req.body.email);
			res.json({ success: true });
		} catch (e) {
			res.status(400).json({ success: false });
		}
	});

router.post('/verify',
	validator('required', { field: 'token' }),
	async (req, res) => {
		try {
			await userService.verify(req.body.token);
			res.json({ success: true });
		} catch (e) {
			res.status(400).json({ success: false });
		}
	});

router.get('/saml/login', passport.authenticate('saml', {
	successRedirect: '/',
	failureRedirect: '/users/saml/login',
}));

router.post('/saml/callback', passport.authenticate('saml', {
	failureRedirect: '/',
	failureFlash: true,
}), async (req, res) => {
	res.redirect(`${clientConfig.url}#/jwt/${await passportJs.getJwtToken(req.user.id)}`);
});

router.get('/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
	passport.authenticate('google', { failureRedirect: '/' }),
	async (req, res) => {
		res.redirect(`${clientConfig.url}#/jwt/${await passportJs.getJwtToken(req.user.id)}`);
	});

router.get('/me/attending', passport.authenticate('jwt'), async (req, res) => {
	res.send(await eventService.getUserAttendingEvents(req.user));
});

router.get('/me/mfa-info', passport.authenticate('jwt'), async (req, res) => {
	if (!req.user.mfaEnabled) {
		const mfaInfo = await userService.getMfaInfo(req.user.id);
		return res.json({ success: true, mfaInfo });
	}
	return res.json({ success: true, mfaEnabled: true });
});

router.put('/me/enable-mfa', passport.authenticate('jwt'), validator('required', { field: 'enableMfaPassword' }), validator('correctPassword', { field: 'enableMfaPassword' }), passport.authenticate('totp'), async (req, res) => {
	try {
		await userService.enableMfa(req.user.id);
	} catch (e) {
		return res.json({ success: false });
	}
	return res.json({ success: true });
});

router.put('/me/disable-mfa', passport.authenticate('jwt'), validator('required', { field: 'disableMfaPassword' }), validator('correctPassword', { field: 'disableMfaPassword' }), async (req, res) => {
	try {
		await userService.disableMfa(req.user.id);
	} catch (e) {
		return res.json({ success: false });
	}
	return res.json({ success: true });
});

export default router;
