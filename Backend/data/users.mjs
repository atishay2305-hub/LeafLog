import { users } from '../config/mongoCollections.mjs';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const userData = {
    async createUser(firstName, lastName, userName, email, password, DOB) {
        const userCollection = await users();
        
        // Check if email already exists
        const checkExist = await userCollection.findOne({ Email: email });
        if (checkExist) {
            throw "Sign in to this account or enter an email address that does not exist.";
        }

        // Check if username already exists
        const checkUserNameExist = await userCollection.findOne({ userName: userName });
        if (checkUserNameExist) {
            throw "User name already exists.";
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user object
        const user = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            Email: email,
            password: hashedPassword,
            DOB: DOB
        }

        // Insert user into the collection
        const insertInfo = await userCollection.insertOne(user);

        // Check if user was successfully added
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw "Could not add user.";
        }

        return { insertedUser: true, userId: insertInfo.insertedId.toString() };
    },

    async checkUser(email, password) {
        const userCollection = await users();

        // Check if the user with the given email exists
        const checkExist = await userCollection.findOne({ Email: email });
        if (!checkExist) {
            throw "You may have entered the wrong email address or password.";
        }

        // Compare the provided password with the hashed password in the database
        const checkPassword = await bcrypt.compare(password, checkExist.password);
        if (!checkPassword) {
            throw "You may have entered the wrong email address or password.";
        }

        // Return user information (excluding the password)
        return {
            firstName: checkExist.firstName,
            lastName: checkExist.lastName,
            userName: checkExist.userName,
            Email: checkExist.Email,
            DOB: checkExist.DOB
        };
    }
};

export default userData;
