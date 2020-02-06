import winston from 'winston';

winston.configure({
	transports: [
		new winston.transports.Console({ level: 'debug' }),
	],
});
