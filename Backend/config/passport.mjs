import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as LocalStrategy } from 'passport-local'; // Import LocalStrategy
import bcrypt from 'bcryptjs';
import { createUser } from '../data/users.mjs'; // Assuming you have createUser function
import User from '../models/Users.mjs';

const GOOGLE_CLIENT_ID = 'your_google_client_id';
const GOOGLE_CLIENT_SECRET = 'your_google_client_secret';

// Google OAuth strategy configuration
passport.use('google', new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If the user does not exist, create a new user with Google credentials
            const { given_name, family_name, email } = profile._json;
            const password = bcrypt.hashSync(profile.id, 10); // Temporary password, consider using a more secure method
            user = await createUser(given_name, family_name, email, password, null); // Assuming no DOB
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

// Local strategy configuration
passport.use('local', new LocalStrategy({
    usernameField: 'email', // Assuming email is used as username
    passwordField: 'password', // Assuming password is sent as 'password'
}, async (email, password, done) => {
    try {
        const user = await checkUser(email, password);

        if (!user) {
            return done(null, false, { message: 'Incorrect email or password.' });
        }

        return done(null, user);
    } catch (error) {
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;
