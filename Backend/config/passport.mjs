import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import { createUser } from '../data/users.mjs';
import User from '../models/Users.mjs';

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

passport.use(User.createStrategy());

passport.use(new GoogleStrategy({
    clientID: '986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/google/callback'   
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // If the user does not exist, create a new user with Google credentials
            const { given_name, family_name, email } = profile._json;
            const password = bcrypt.hashSync(profile.id, 10); // Temporary password
            user = await createUser(given_name, family_name, email, password, null); // Assuming no DOB
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));
