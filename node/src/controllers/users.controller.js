import express from 'express';
import passport from 'passport';
import validator from '../middleware/validator';
import User from '../models/user.model';
import isAuthenticated from '../middleware/isAuthenticated';
import userService from '../services/user.service';

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

router.get('/me', isAuthenticated, async (req, res) => {
	res.json({ email: req.user.email });
});

router.post(
	'/login',
	passport.authenticate('local'),
	async (req, res) => {
		res.json({
			success: true,
			token: userService.getJwtToken(),
			user: req.user,
		});
	},
);

export default router;
