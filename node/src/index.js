import express from 'express';
import http from 'http';
import cors from 'cors';
import Mongoose from 'mongoose';
import winston from 'winston';
import serverConfig from '../config/server';
import clientConfig from '../config/client';
import hello from './controllers/hello';
import event from './controllers/event.controller';
import './helpers/connectToDatabase';
import './helpers/winston';

winston.info(`Client project URL is ${clientConfig.url}`);

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: clientConfig.url }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TODO: probably don't need this
app.use('/hello', hello);
app.use('/events', event);


server.listen(serverConfig.port);

export default { app, server, db: Mongoose.connection };
