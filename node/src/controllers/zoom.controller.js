import express from 'express';
import passport from 'passport';
import zoomService from '../services/zoom.service';
import userService from '../services/user.service';

const router = express.Router();

// looselsy based on https://github.com/zoom/zoom-oauth-sample-app
// accessed 24 March 2020
router.get(
	'/',
	passport.authenticate('jwt-query'),
	async (req, res) => {
		res.redirect(zoomService.getZoomRedirectUrl(req.query.jwt));
	},
);

router.get(
	'/auth',
	passport.authenticate('jwt-query'),
	async (req, res) => {
		const refreshToken = await zoomService.getRefreshTokenFromCodeAndJwt(
			req.query.jwt,
			req.query.code,
		);
		await userService.setUserProfileById(req.user._id, { zoom: { refreshToken } });
		// this is where the sensible part of this ends
		return res.send(await zoomService.getAccessToken(req.user));
	},
);


router.get(
	'/test',
	passport.authenticate('jwt-query'),
	async (req, res) => {
		await zoomService.createMeeting(req.user);
		return res.send(await zoomService.getMeetings(req.user));
	},
);
export default router;
