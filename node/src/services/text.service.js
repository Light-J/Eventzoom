import Twilio from 'twilio';
import twilioConfig from '../../config/twilio';

const client = new Twilio(twilioConfig.account_sid, twilioConfig.auth_token);

const sendText = async (to, body) => client.messages.create({
	body,
	to,
	from: twilioConfig.number,
});
export default { sendText };
