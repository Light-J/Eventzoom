import bcrypt from 'bcryptjs';
import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import passportLocal from 'passport-local';
import authConfig from '../../config/auth';
import User from '../models/user.model';

const createUser = async (user) => {
	const hash = await bcrypt.hash(user.password, 8);
	await ((new User({ ...user, password: hash })).save());
	return true;
};

const getUserByEmail = async (email) => {
	try {
		return await User.findOne({ email });
	} catch (e) {
		throw Error('Error while getting single user');
	}
};

const getUserById = async (id) => {
	try {
		return await User.findOne({ id });
	} catch (e) {
		throw Error('Error while getting single user');
	}
};

const JwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
	secretOrKey: authConfig.key,
};

const getJwtToken = async () => jwt.sign({ id: req.user.id }, JwtOptions.secretOrKey, {
	expiresIn: 60 * 60,
});

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

passport.use(new passportLocal.Strategy({
	session: false,
},
(async (username, password, done) => {
	const user = await getUserByEmail(username);
	if (!user) { return done(null, false); }
	if (!await user.verifyPassword(password)) { return done(null, false); }
	return done(null, user);
})));

passport.use(
	'jwt',
	new JwtStrategy(JwtOptions, async (jwtPayload, done) => {
		try {
			const user = await getUserById(jwtPayload.id);
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		} catch (err) {
			done(err);
		}
	}),
);

export default {
	createUser, getUserByEmail, getUserById, getJwtToken,
};
