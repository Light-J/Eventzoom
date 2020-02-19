import express from 'express';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import passportLocal from 'passport-local';
import validator from '../middleware/validator';
import UserService from '../services/user.service';
import User from '../models/user.model';
import isAuthenticated from '../middleware/isAuthenticated';

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(new passportLocal.Strategy({
	usernameField: 'username',
	passwordField: 'password',
	session: false,
},
(async (username, password, done) => {
	const user = await UserService.getUserByEmail(username);
	if (!user) { return done(null, false); }
	if (!await user.verifyPassword(password)) { return done(null, false); }
	return done(null, user);
})));

const JwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	secretOrKey: process.env.SESSION_SECRET || 'cats',
};

passport.use(
	'jwt',
	new JwtStrategy(JwtOptions, (jwtPayload, done) => {
		try {
			User.findOne({
				where: {
					id: jwtPayload.id,
				},
			}).then((user) => {
				if (user) {
					done(null, user);
				} else {
					done(null, false);
				}
			});
		} catch (err) {
			done(err);
		}
	}),
);

const router = express.Router();

router.post(
	'/',
	validator('required', { field: 'email' }),
	validator('regex', { regex: /[^@]+@[^.]+\..+/, field: 'email' }),
	validator('required', { field: 'password' }),
	validator('sameAs', { field: 'password', otherField: 'passwordConfirmation' }),
	validator('validModel', { model: User }),
	async (req, res) => {
		await UserService.createUser(req.validated);
		res.json({ success: true });
	},
);

router.get('/me', isAuthenticated, async (req, res) => {
	const user = await UserService.getUserById(req.validated);
	res.json({ user });
});

router.post(
	'/login',
	passport.authenticate('local'),
	async (req, res) => {
		const token = jwt.sign({ id: req.user.id }, JwtOptions.secretOrKey, {
			expiresIn: 60 * 60,
		});
		res.json({
			success: true,
			token,
		});
	},
);

export default router;
