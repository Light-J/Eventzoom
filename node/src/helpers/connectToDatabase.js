import Mongoose from 'mongoose';
import databaseConfig from '../../config/database';

Mongoose.connect(databaseConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true });
