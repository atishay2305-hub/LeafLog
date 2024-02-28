import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const GOOGLE_CLIENT_ID = '986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/google/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Handle the user profile here
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
