export default {
	port: 3001,
	isServerless: process.env.IS_SERVERLESS || false,
	secret: process.env.SERVER_SECRET || 'cats',
};
