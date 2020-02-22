import Mongoose from 'mongoose';
import databaseConfig from '../../config/database';
console.log(databaseConfig.uri);
Mongoose.connect(databaseConfig.uri, { useNewUrlParser: true, useUnifiedTopology: true });
