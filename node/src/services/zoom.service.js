import axios from 'axios';
import zoomConfig from '../../config/zoom';
import cacheService from './cache.service';
import userService from './user.service';
// this isn't implemented in the front-end because of HashRouter

const oauthAxios = axios.create({
	auth: {
		username: zoomConfig.clientId,
		password: zoomConfig.clientSecret,
	},
});

const getAccessToken = async (user) => cacheService.remember(
	`users.${user._id}.zoom_access_token`,
	1800, // half an hour
	async () => {
		const newUser = await userService.getUserById(user._id);
		const data = await oauthAxios.post(`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${encodeURIComponent(newUser.zoom.refreshToken)}`);
		userService.setUserProfileById(user._id, { zoom: { refreshToken: data.data.refresh_token } });
		return data.data.access_token;
	},
);


const getZoomUserClient = async (user) => axios.create({
	baseURL: 'https://api.zoom.us/v2',
	headers: {
		Authorization: `Bearer ${await getAccessToken(user)}`,
	},
});

const getRedirectUrl = (jwt) => `${zoomConfig.redirectUri}?jwt=${encodeURIComponent(jwt)}`;

const getZoomRedirectUrl = (jwt) => {
	const redirectUrl = getRedirectUrl(jwt);
	return `https://zoom.us/oauth/authorize?response_type=code&client_id=${zoomConfig.clientId}&redirect_uri=${redirectUrl}`;
};

const getRefreshTokenFromCodeAndJwt = async (jwt, code) => {
	const redirectUrl = getRedirectUrl(jwt);
	const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}`;
	const data = await oauthAxios.post(url);
	return data.data.refresh_token;
};

const createMeeting = async (user, name, startTime) => {
	const client = await getZoomUserClient(user);
	const response = await client.post('/users/me/meetings', {
		topic: name,
		start_time: startTime.toString(),
		duration: 60,
		type: 2, // scheduled
	});
	return response.data.join_url;
};

export default {
	getZoomRedirectUrl, getRefreshTokenFromCodeAndJwt, getAccessToken, createMeeting,
};
