// Import other necessary modules
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import plantDataRouter from './routes/plant_dataRoutes.mjs';
import diseaseDataRouter from './routes/diseaseRoutes.mjs';
import { plant_data } from './data/plant_data.mjs';
import { diseaseData } from './data/diseases.mjs';
import { detailsData } from './data/details.mjs';
import userRoutes from './routes/users.mjs';
import './models/auth.mjs'

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

const app = express();
const port = 3000;

app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(userRoutes);
app.use(plantDataRouter);
app.use(diseaseDataRouter);

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
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res)=>{
  req.logOut();
  req.session.destroy();
  res.send('GoodBye!');
})


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Load initial data
plant_data();
diseaseData();
detailsData();
