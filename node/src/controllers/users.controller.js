import express from 'express';
import passport from 'passport';
import validator from '../middleware/validator';
import User from '../models/user.model';
import isAuthenticated from '../middleware/isAuthenticated';
import userService from '../services/user.service';
import passportJs from './auth/passport';

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

export default router;
