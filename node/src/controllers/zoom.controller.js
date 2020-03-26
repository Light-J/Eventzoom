import express from 'express';
import passport from 'passport';
import zoomService from '../services/zoom.service';
import userService from '../services/user.service';
import isStaff from '../middleware/isStaff';
import clientConfig from '../../config/client';

const router = express.Router();

// looselsy based on https://github.com/zoom/zoom-oauth-sample-app
// accessed 24 March 2020
router.get(
	'/',
	passport.authenticate('jwt-query'),
	isStaff,
	async (req, res) => {
		res.redirect(zoomService.getZoomRedirectUrl(req.query.jwt));
	},
);

router.get(
	'/auth',
	passport.authenticate('jwt-query'),
	isStaff,
	async (req, res) => {
		const refreshToken = await zoomService.getRefreshTokenFromCodeAndJwt(
			req.query.jwt,
			req.query.code,
		);
		await userService.setUserProfileById(req.user._id, { zoom: { refreshToken } });
		res.redirect(`${clientConfig.url}#/profile`);
	},
);


router.delete(
	'/',
	passport.authenticate('jwt'),
	isStaff,
	async (req, res) => {
		await userService.setUserProfileById(req.user._id, { zoom: undefined });
		res.send({ success: true });
	},
);

export default router;
