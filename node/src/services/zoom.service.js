import axios from 'axios';
import zoomConfig from '../../config/zoom';

// this isn't implemented in the front-end because of HashRouter


const oauthAxios = axios.create({
	auth: {
		username: zoomConfig.clientId,
		password: zoomConfig.clientSecret,
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

export default { getZoomRedirectUrl, getRefreshTokenFromCodeAndJwt };
