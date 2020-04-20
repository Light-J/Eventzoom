import Mongoose from 'mongoose';
import winston from 'winston';
import databaseConfig from '../../config/database';

winston.debug(`Mongoo config URL is ${databaseConfig.uri}`);
// this has to not use the new parser because of lambda fuckery
// see https://github.com/Automattic/mongoose/issues/8180
Mongoose.connect(
	databaseConfig.uri, {
		useNewUrlParser: true,
		serverSelectionTimeoutMS: 3000,
		connectTimeoutMS: 3000,
	},
);
