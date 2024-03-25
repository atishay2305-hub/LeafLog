import bcrypt from 'bcryptjs';
import { users as usersCollection } from '../config/mongoCollections.mjs';
import { ObjectId } from 'mongodb';
import { checkEmail, checkPassword, checkLegitName, checkDOB } from '../Helper/validation_checker.mjs'; // Import validation functions

async function createUser(firstName, lastName, userName, email, password, DOB) {
    try {
        const users = await usersCollection();

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

        const user = await users.findOne({ email });

        if (!user) {
            throw new Error("User does not exist.");
        } else {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error("You may have entered the wrong email address or password.");
            }

            const { firstName, lastName, userName, DOB } = user;
            return { firstName, lastName, userName, email: user.email, DOB };
        }
    } catch (error) {
        console.log("I am here")
        throw new Error(error.message);
    }
}

export { createUser, checkUser};
