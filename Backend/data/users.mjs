// import {users} from '../config/mongoCollections.mjs';
// import bcrypt from 'bcrypt';
// import { ObjectId } from 'mongodb';

// let exportedMethods = {
//     async createUser(firstName, lastName, userName, Email, password, DOB){
//         // TODO: Apply validations here using a separate validation file
//         const userCollection = await users();
//         const checkExist = await userCollection.findOne({email: email})
//         if (checkExist) throw "Sign in to this account or enter an email address that does not exist."
//         const checkUserNameExist = await userCollection.findOne({userName: userName})
//         if (checkUserNameExist) throw "User name already exists."

//         let user = {
//             firstName: firstName,
//             lastName: lastName,
//             userName: userName,
//             email: email,
//             password: await bcrypt.hash(password, 10),
//             DOB: DOB
//         }

    

//     const insertInfo = await userCollection.insertOne(user);
//     if (!insertInfo.acknowledged || !insertInfo.insertedId) throw "Could not add user.";
//     return {insertedUser: true, userId: insertInfo.insertedId.toStrng()};

// },

// async checkUser(email, password){
//     // TODO: Do validations here
//     const userCollection = await users();
//     const checkExist = await userCollection.findOne({email: email})
//     if (!checkExist){

//     }
// }


// }