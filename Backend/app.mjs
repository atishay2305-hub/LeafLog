import express from 'express';
// import passport from 'passport';
// import session from 'express-session';
import mongoose from 'mongoose';
// import MongoStore from 'connect-mongo';
import plantDataRouter from './routes/plant_dataRoutes.mjs'
import diseaseDataRouter from './routes/diseaseRoutes.mjs';
import { plant_data } from './data/plant_data.mjs';
import {diseaseData} from './data/diseases.mjs';


// import keys from './config/keys';
// import User from './models/User';
// import configurePassport from './config/passport';
// import authRoutes from './routes/authRoutes';

const app = express();
const port = 3000;

// Connect to MongoDB
// mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err));

// // Express session middleware
// app.use(session({
//   secret: 'your-session-secret', // Replace with your own secret
//   resave: false,
//   saveUninitialized: false,
//   store: new (MongoStore(session))({ mongooseConnection: mongoose.connection }),
// }));

// // Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Configure Passport (assuming configurePassport is in config/passport.js)
// configurePassport(passport, User);

// // Authentication routes
// app.use('/auth', authRoutes);

// // API routes
// app.use('/api', apiRoutes);

// // Default route
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.use(express.json());

app.use(plantDataRouter);

app.use(diseaseDataRouter);


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

plant_data();
diseaseData();
