import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import Mongoose from 'mongoose';
import serverConfig from '../config/server';
import clientConfig from '../config/client';
import hello from './controllers/hello';
import './helpers/connectToDatabase';
import './helpers/winston';
import passport from 'passport';
import {Strategy as SamlStrategy} from 'passport-saml';

dotenv.config();
const app = express();
const server = http.createServer(app);



app.use(cors({ origin: clientConfig.url }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TODO: probably don't need this

passport.use(new SamlStrategy(
    {
        entryPoint: 'https://accounts.google.com/o/saml2/idp?idpid=C03745l73', // SSO URL (Step 2)
        issuer: '42069', // Entity ID (Step 4)
        callbackUrl: 'https://test123.freetunnel.hdimitrov.com/auth/saml/callback', // ACS URL path (Step 4)
    },
    function(profile, done) {
      console.log(profile);
      done(profile);
    })
  );


  app.get('/login', passport.authenticate('saml', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))


  app.post('/auth/saml/callback', passport.authenticate('saml', {
    failureRedirect: '/error',
    failureFlash: true
  }), function (req, res) {
    res.redirect('/')
  })


app.use('/hello', hello);


server.listen(serverConfig.port);

export default { app, server, db: Mongoose.connection };
