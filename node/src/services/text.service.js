import twilio from 'twilio';
import twilioConfig from '../../config/twilio';

// This is from the twilio library so not much I can do about this
// eslint-disable-next-line new-cap
const client = new twilio(twilioConfig.account_sid, twilioConfig.auth_token);

const sendText = async (to, body) => {
	client.messages.create({
		body,
		to,
		from: twilioConfig.number,
	});
};
export default { sendText };
