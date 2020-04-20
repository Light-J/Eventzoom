import passport from 'passport';
import passportLocal from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Strategy as SamlStrategy } from 'passport-saml';
import { Strategy as TotpStrategy } from 'passport-totp';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import base32 from 'thirty-two';
import authConfig from '../../config/auth';
import userService from './user.service';
import userModel from '../models/user.model';
import googleConfig from '../../config/google';

const passportLocalVerify = async (username, password, done) => {
	const user = await userService.getUserByEmail(username);
	if (!user) { return done(null, false); }
	if (!user.verified) { return done(null, false); }

	return bcrypt.compare(password, user.password).then((result) => {
		if (result) {
			return done(null, user);
		}
		return done(null, false);
	}).catch(() => done(null, false));
};

const JwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
	secretOrKey: authConfig.key,
};

const getJwtToken = async (userId, expiry = 3600) => jwt.sign({ id: userId },
	JwtOptions.secretOrKey,
	{
		expiresIn: expiry,
	});

const jwtRetrieve = async (jwtPayload, done) => {
	try {
		const user = await userService.getUserById(jwtPayload.id);
		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	} catch (err) {
		done(err);
	}
};

const initPassport = (app) => {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		done(null, user);
	});

	passport.use(new passportLocal.Strategy({ session: false }, passportLocalVerify));
	passport.use(new AnonymousStrategy());
	passport.use(
		'jwt',
		new JwtStrategy(JwtOptions, jwtRetrieve),
	);

	passport.use(new TotpStrategy(((user, done) => {
		const key = user.mfaSecret;
		if (!key) {
			return done(new Error('No key'));
		}
		return done(null, base32.decode(key), 30); // 30 is the valid period
	})));

	// used for weird redirecty things
	// like the zoom controller
	const jwtQueryOptions = { ...JwtOptions, jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt') };
	passport.use(
		'jwt-query',
		new JwtStrategy(jwtQueryOptions, jwtRetrieve),
	);
	passport.use(new SamlStrategy(
		{
			entryPoint: authConfig.saml.entryPoint,
			issuer: authConfig.saml.issuer,
			callbackUrl: authConfig.saml.callbackUrl,
			cert: authConfig.saml.cert,
			acceptedClockSkewMs: -1,
		},
		(async (profile, done) => {
			const email = profile[authConfig.saml.emailField];
			const name = profile[authConfig.saml.nameField];
			const school = profile[authConfig.saml.schoolField];
			const phoneNumber = profile[authConfig.saml.phoneNumberField];
			const staff = profile[authConfig.saml.typeField] === 'staff';
			const samlUser = await userModel.findOneAndUpdate(
				{ email },
				{
					name, phoneNumber, filterable: { public: false, school, staff }, sso: true,
				},
				{ new: true, upsert: true },
			);
			done(null, samlUser);
		}),
	));
	passport.use(new GoogleStrategy({
		clientID: googleConfig.clientId,
		clientSecret: googleConfig.clientSecret,
		callbackURL: googleConfig.callbackUrl,
	},
	(async (accessToken, refreshToken, profile, done) => {
		try {
			const email = profile.emails[0].value;
			const name = profile.displayName;
			const user = await userModel.findOneAndUpdate({ email },
				{ email, name, filterable: { public: true } },
				{ new: true, upsert: true });
			done(null, user);
		} catch (e) {
			done(e, null);
		}
	})));
};


export default { getJwtToken, initPassport };
