import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { users } from '../config/mongoCollections.mjs';

const GOOGLE_CLIENT_ID = '986312544048-7a63n93h3c8od12r16l336lnft7baq3o.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/google/callback',
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    // Here, you could also check if the user exists in your database and create a new user if they do not.
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
    // Here you should find the user by ID from your database and then call done
    const user = await findUserById(id); // Add a function to find the user by ID
    done(null, user);
});

const findUserById = async (id) => {
    const userCollection = await users();
    return await userCollection.findOne({ _id: ObjectId(id) });
};

const auth = {
    googleAuth: passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email'],
    }),

    googleAuthCallback: passport.authenticate('google', { failureRedirect: '/' }),

    async createUser(firstName, lastName, userName, email, password, DOB) {
        const userCollection = await users();

        // Check if email already exists
        const existingEmail = await userCollection.findOne({ email });
        if (existingEmail) {
            throw new Error("Sign in to this account or enter an email address that does not exist.");
        }

        // Check if username already exists
        const existingUserName = await userCollection.findOne({ userName });
        if (existingUserName) {
            throw new Error("User name already exists.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const user = {
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            DOB,
        };

        // Insert user into the collection
        const insertInfo = await userCollection.insertOne(user);

        // Check if user was successfully added
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error("Could not add user.");
        }

        // Include the user ID in the return object
        return { insertedUser: true, userId: insertInfo.insertedId.toString(), user };
    },

    async checkUser(email, password) {
        const userCollection = await users();

        try {
            // Check if the user with the given email exists
            const user = await userCollection.findOne({ email });

            if (!user) {
                throw new Error("You may have entered the wrong email address or password.");
            }

            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("You may have entered the wrong email address or password.");
            }

            // Return user information (excluding the password)
            const { firstName, lastName, userName, email, DOB } = user;
            return { firstName, lastName, userName, email, DOB };
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateUser(userId, updatedData) {
        const userCollection = await users();

        try {
            // Check if the user with the given ID exists
            const user = await userCollection.findOne({ _id: ObjectId(userId) });

            if (!user) {
                throw new Error("User not found.");
            }

            // If there are updates, apply them
            if (Object.keys(updatedData).length > 0) {
                // Update user in the collection
                const updateInfo = await userCollection.findOneAndUpdate(
                    { _id: ObjectId(userId) },
                    { $set: updatedData },
                    { returnDocument: 'after' }
                );

                // Check if user was successfully updated
                if (!updateInfo.ok || !updateInfo.value) {
                    throw new Error("Could not update user.");
                }
            }

            // Return user information (excluding the password)
            const { firstName, lastName, userName, email, DOB } = user;
            return { firstName, lastName, userName, email, DOB };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default auth;
