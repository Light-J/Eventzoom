import express from 'express';
import axios from 'axios';
import passport from 'passport';
import user from '../models/user.model';

const clientId = 'rsWDemq2RKS8FMoKO7GkQ';
const clientSecret = 'TgzoCdjZxwTdndiq5Huf1t55qnw1ALzo';
const zoomAxios = axios.create({
	auth: {
		username: clientId,
		password: clientSecret,
	},
});
const redirectUrl = 'http://localhost:3001/zoom/auth';
const router = express.Router();

// looselsy based on https://github.com/zoom/zoom-oauth-sample-app
// accessed 24 March 2020

// most of this fuckery can be done on the front end if i wasn't using hashrouter
// for s3's sake
router.get(
	'/',
	passport.authenticate('jwt-query'),
	async (req, res) => {
		console.log(req.query);
		const redirectForUser = `${redirectUrl}?jwt=${encodeURIComponent(req.query.jwt)}`;
		res.redirect(`https://zoom.us/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectForUser}`);
	},
);

router.get(
	'/auth',
	passport.authenticate('jwt-query'),
	async (req, res) => {
		console.log(req.query);
		const redirectForUser = `${redirectUrl}?jwt=${encodeURIComponent(req.query.jwt)}`;
		const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=${redirectForUser}`;
		const results = await zoomAxios.post(url);
		await user.findByIdAndUpdate(req.user._id, { zoom: { refreshToken: results.data.refresh_token } });
		// results.data.refresh_token;
		// let refresh2;
		// try {
		// 	console.log(results.data.refresh_token);
		// 	refresh2 = await zoomAxios.post(`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${results.data.refresh_token}`);
		// 	// refresh1 = await zoomAxios.post(`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${results.data.refresh_token}`);
		// } catch (e) {
		// 	console.log(e.response.data);
		// }
		// console.log(refresh2.data);
		res.send('hello');
	},
);
export default router;
