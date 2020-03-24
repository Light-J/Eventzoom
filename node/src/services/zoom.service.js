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

const getZoomUserClient = async (user) => axios.create({
	baseURL: 'https://api.zoom.us/v2',
	headers: {
		Authorization: `Bearer ${await getAccessToken(user)}`,
	},
});
// TODO: remove me
const getMeetings = async (user) => {
	// api.zoom.us/v2/users/me/meetings
	const client = await getZoomUserClient(user);
	const response = await client.get('/users/me/meetings');
	return response.data;
};

const createMeeting = async (user) => {
	// api.zoom.us/v2/users/me/meetings
	const client = await getZoomUserClient(user);
	const response = await client.post('/users/me/meetings', {
		topic: 'test event',
		start_time: new Date('2020-03-24').toString(),
		duration: 60,
		type: 2,
	});
	return response.data;
};

const getAccessToken = async (user) => cacheService.remember(
	`users.${user._id}.zoom_access_token`,
	1800, // half an hour
	async () => {
		const newUser = await userService.getUserById(user._id);
		console.log(user.zoom.refreshToken);
		const data = await oauthAxios.post(`https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${encodeURIComponent(newUser.zoom.refreshToken)}`);
		userService.setUserProfileById(user._id, { zoom: { refreshToken: data.data.refresh_token } });
		return data.data.access_token;
	},
);

const getRedirectUrl = (jwt) => `${zoomConfig.redirectUri}?jwt=${encodeURIComponent(jwt)}`;

const getZoomRedirectUrl = (jwt) => {
	const redirectUrl = getRedirectUrl(jwt);
	return `https://zoom.us/oauth/authorize?response_type=code&client_id=${zoomConfig.clientId}&redirect_uri=${redirectUrl}`;
};

const getRefreshTokenFromCodeAndJwt = async (jwt, code) => {
	const redirectUrl = getRedirectUrl(jwt);
	const url = `https://zoom.us/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirectUrl}`;
	const data = await oauthAxios.post(url);
	console.log(data.data.refresh_token);
	return data.data.refresh_token;
};

export default {
	getZoomRedirectUrl, getRefreshTokenFromCodeAndJwt, getAccessToken, getMeetings, createMeeting,
};
