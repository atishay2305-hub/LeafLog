import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import bcrypt from 'bcryptjs';
import { createUser} from '../data/users.mjs';
import User from '../models/Users.mjs';

const GOOGLE_CLIENT_ID = '986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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'


// Google OAuth strategy configuration
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true,
}, async (accessToken, refreshToken, profile, done) => {
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
