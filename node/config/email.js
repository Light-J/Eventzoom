export default {
	host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
	port: process.env.EMAIL_PORT || 2525,
	user: process.env.EMAIL_USER || 'b241a100676560',
	pass: process.env.EMAIL_PASSWORD || 'b2456967a5a9c1',
	from: process.env.EMAIL_FROM || 'me@hdimitrov.com',
};
