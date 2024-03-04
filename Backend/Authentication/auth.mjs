import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const GOOGLE_CLIENT_ID = '986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/google/callback',
  passReqToCallback: true,
}, (req, accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user); 
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
