import express from 'express';
import session from 'express-session';
import passport from 'passport';
import nodemailer from 'nodemailer';
import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import { plant_data } from './data/plant_data.mjs';
import { diseaseData } from './data/diseases.mjs';
import { detailsData } from './data/details.mjs';
import plantDataRouter from './routes/plant_dataRoutes.mjs';
import diseaseDataRouter from './routes/diseaseRoutes.mjs';
// import ProtectedComponent from '../Frontend/src/Pages/protected.mjs';
import path from 'path';
import './Authentication/auth.mjs';

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

const app = express();
const port = 3000;

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(plantDataRouter);
app.use(diseaseDataRouter);

// app.use(express.static(path.join(__dirname, '../Frontend')));


const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "test@gmail.com",
    pass: "password@123"
  }
});

const details = {
  from: "test@gmail.com",
  to: "atishay23@gmail.com", // TODO: take the logged-in user email id, for now, I put my own
  subject: "testing our nodemailer", // TODO: add the message variable
  text: "Testing our first sender" // TODO: same as above
};

mailTransporter.sendMail(details, (err) => {
  if (err) {
    console.log(`It has an error`, err);
  } else {
    console.log("Email has been sent.");
  }
});


app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

app.get('/auth/failure', (req, res) => {
  res.send('Something went wrong.');
});

app.get('/protected', isLoggedIn, (req, res) => {
  const reactDom = ReactDOMServer.renderToString(React.createElement(ProtectedComponent, { displayName: req.user.displayName }));
  res.render('index', { reactDom });
});


app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('GoodBye!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

plant_data();
diseaseData();
detailsData();
