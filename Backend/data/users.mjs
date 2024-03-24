import bcrypt from 'bcryptjs';
import { users as usersCollection } from '../config/mongoCollections.mjs';
import { ObjectId } from 'mongodb';
import { checkEmail, checkPassword, checkLegitName, checkDOB } from '../Helper/validation_checker.mjs'; // Import validation functions

async function createUser(firstName, lastName, userName, email, password, DOB) {
    try {
        const users = await usersCollection();

        // Validate input data
        checkLegitName(firstName, 'First Name');
        checkLegitName(lastName, 'Last Name');
        checkLegitName(userName, 'User Name');
        checkEmail(email);
        checkPassword(password);
        checkDOB(DOB);

        const existingEmail = await users.findOne({ email });
        if (existingEmail) {
            throw new Error("Sign in to this account or enter an email address that does not exist.");
        }

        const existingUserName = await users.findOne({ userName });
        if (existingUserName) {
            throw new Error("User name already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
            DOB,
        };

        const insertInfo = await users.insertOne(user);

        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw new Error("Could not add user.");
        }

        return { insertedUser: true, userId: insertInfo.insertedId.toString(), user };
    } catch (error) {
        throw new Error(error.message);
    }
}

async function checkUser(email, password) {
    try {
        const users = await usersCollection();

        // Check if the user with the given email exists
        const user = await users.findOne({ email });

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
}

async function updateUser(userId, updatedData) {
    try {
        const users = await usersCollection();

        // Check if the user with the given ID exists
        const user = await users.findOne({ _id: ObjectId(userId) });

        if (!user) {
            throw new Error("User not found.");
        }

        // If there are updates, apply them
        if (Object.keys(updatedData).length > 0) {
            // Update user in the collection
            const updateInfo = await users.findOneAndUpdate(
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
}

export { createUser, checkUser, updateUser };
