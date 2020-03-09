
import nodemailer from 'nodemailer';
import Email from 'email-templates';
import path from 'path';
import emailConfig from '../../config/email';
import clientConfig from '../../config/client';
import serverConfig from '../../config/server';

const transport = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass,
	},
});
const email = new Email({
	message: {
		from: emailConfig.from,
	},
	send: true,
	preview: false,
	views: {
		// use dist/ views if serverless
		root: serverConfig.isServerless ? path.resolve('dist/src/views/emails') : path.resolve('src/views/emails'),
	},
	transport,
});


const sendEmail = async (to, template, locals, otherParams = {}) => {
	await email.send({
		template,
		locals: { clientUrl: clientConfig.url, ...locals },
		message: {
			to,
			...otherParams,
		},
	});
};
export default { transport, sendEmail };
