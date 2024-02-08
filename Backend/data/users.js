import {users} from '../config/mongoCollections.js'
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

// TODO: add validation function in some file called validationchecker.js
// TODO: add userdata from index.js


let exportedMethods = {
async createUser(firstName, lastName, userName, email, password, DOB){

    // TODO: add validations of every parameters passed in the function
    const userCollection = await users();
    const checkExist = await userCollection.findOne({email: email});
    if (checkExist){
        throw "Sign in to this account or enter an email address that is not already in use.";
    }

    const checkUserNameExist = await userCollection.findOne({userName: userName});
    if (checkUserNameExist){
        throw "User name already exists.";
    }

    let user = {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: await bcrypt.hash(password, 10),
        DOB: DOB
    };

    const insertInfo = await userCollection.insertOne(user){
        if(!insertInfo.acknowledged || !insertInfo.insertedId){
            throw 
        }
    }
}

}
a
