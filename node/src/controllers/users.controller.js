import express from 'express';
import passport from 'passport';
import validator from '../middleware/validator';
import User from '../models/user.model';
import isAuthenticated from '../middleware/isAuthenticated';
import isNotSsoUser from '../middleware/isNotSsoUser';
import userService from '../services/user.service';
import passportJs from './auth/passport';
import clientConfig from '../../config/client';

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

router.get('/me', passport.authenticate('jwt'), isAuthenticated, async (req, res) => {
	const user = req.user;
	delete user.password;
	res.json({ user });
});

router.put('/me', passport.authenticate('jwt'), isAuthenticated, isNotSsoUser,
	validator('required', { field: 'email' }),
	validator('required', { field: 'name' }),
	async (req, res) => {
		try {
			console.log(req.validated);
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


router.put('/me/password', passport.authenticate('jwt'), isAuthenticated, isNotSsoUser,
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
		res.json({
			success: true,
			token: await passportJs.getJwtToken(req.user.id),
			user: req.user,
		});
	},
);

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


export default router;
