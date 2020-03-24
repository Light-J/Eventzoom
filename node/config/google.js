export default {
	callbackUrl: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/users/auth/google/callback',
	clientId: process.env.GOOGLE_CLIENT_ID || '461198605347-ba88r0ek7l2816oj25tsng9qijmlrvfu.apps.googleusercontent.com',
	clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'Q3JONzMkM7rJS2TWfRrN9pNj',
};
