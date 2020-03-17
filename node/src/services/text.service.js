import twilio from 'twilio';
import twilioConfig from '../../config/twilio';

const client = new twilio(twilioConfig.account_sid, twilioConfig.auth_token);

const sendText = async (to, body) => {
	client.messages.create({
		body,
		to,
		from: twilioConfig.number,
	}).then((message) => console.log(message.sid));
};
export default { sendText };
