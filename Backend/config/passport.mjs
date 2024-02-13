import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';
import keys from './keys'; // Import your API keys

passport.use(new GoogleStrategy({
  clientID: keys.google.clientID,
  clientSecret: keys.google.clientSecret,
  callbackURL: keys.google.callbackURL,
},
(accessToken, refreshToken, profile, done) => {
  // You can implement your user retrieval or creation logic here
  return done(null, profile);
}));

// Serialize and deserialize user (example, adjust as needed)
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
