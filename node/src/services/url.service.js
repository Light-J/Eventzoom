import axios from 'axios';
import bitlyConfig from '../../config/bitly';


const shorten = async (url) => {
	let shortened;
	try {
		shortened = await axios.post('https://api-ssl.bitly.com/v4/shorten', { long_url: url }, {
			headers: {
				Authorization: `Bearer ${bitlyConfig.token}`,
				'Content-Type': 'application/json',
			},
		});
	} catch (e) {
		// bit.ly is finnicky with localhost in its url
		return url;
	}
	return shortened.data.link;
};
export default { shorten };
