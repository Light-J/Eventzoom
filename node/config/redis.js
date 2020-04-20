export default {
	host: process.env.REDIS_HOST || 'redis-16388.c9.us-east-1-2.ec2.cloud.redislabs.com',
	port: process.env.REDIS_PORT || 16388,
	password: process.env.REDIS_PASSWORD || 'qweasd123!',
};
