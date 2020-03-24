import express from 'express';
import passport from 'passport';
import zoomService from '../services/zoom.service';
import userService from '../services/user.service';

const router = express.Router();

// looselsy based on https://github.com/zoom/zoom-oauth-sample-app
// accessed 24 March 2020

// most of this fuckery can be done on the front end if i wasn't using hashrouter
// for s3's sake
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
		res.send('hello');
	},
);
export default router;
