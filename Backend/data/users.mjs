import { users } from '../config/mongoCollections.mjs';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

const exportedMethods = {
    async createUser(firstName, lastName, userName, Email, password, DOB) {
        const userCollection = await users();
        const checkExist = await userCollection.findOne({ Email: Email });
        if (checkExist) throw "Sign in to this account or enter an email address that does not exist.";
        const checkUserNameExist = await userCollection.findOne({ userName: userName });
        if (checkUserNameExist) throw "User name already exists.";

        let user = {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            Email: Email,
            password: await bcrypt.hash(password, 10),
            DOB: DOB
        }

        const insertInfo = await userCollection.insertOne(user);
        if (!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not add user.";
        return { insertedUser: true, userId: insertInfo.insertedId.toString() };
    },

    async checkUser(email, password) {
        const userCollection = await users();
        const checkExist = await userCollection.findOne({ Email: email });
        if (!checkExist) {
            throw "You may have entered the wrong email address or password.";
        }

        const checkPassword = await bcrypt.compare(
            password,
            checkExist.password
        );

        if (!checkPassword) throw "You may have entered the wrong email address or password.";

        return {
            firstName: checkExist.firstName,
            lastName: checkExist.lastName,
            userName: checkExist.userName,
            Email: checkExist.Email,
            password: checkExist.password,
            DOB: checkExist.DOB
        };
    }
}

export { exportedMethods };
