// import { users } from '../config/mongoCollections.mjs';
// import bcrypt from 'bcrypt';
// import { ObjectId } from 'mongodb';

// const userData = {
//     async createUser(firstName, lastName, userName, email, password, DOB) {
//         const userCollection = await users();
    
//         // Check if email already exists
//         const checkExist = await userCollection.findOne({ email });
//         if (checkExist) {
//             throw new Error("Sign in to this account or enter an email address that does not exist.");
//         }
    
//         // Check if username already exists
//         const checkUserNameExist = await userCollection.findOne({ userName });
//         if (checkUserNameExist) {
//             throw new Error("User name already exists.");
//         }
    
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);
    
//         // Create user object
//         const user = {
//             firstName,
//             lastName,
//             userName,
//             email,
//             password: hashedPassword,
//             DOB,
//         };
    
//         // Insert user into the collection
//         const insertInfo = await userCollection.insertOne(user);
    
//         // Check if user was successfully added
//         if (!insertInfo.acknowledged || !insertInfo.insertedId) {
//             throw new Error("Could not add user.");
//         }
    
//         // Include the user ID in the return object
//         return { insertedUser: true, userId: insertInfo.insertedId.toString(), user };
//     },
    

//     async checkUser(email, password) {
//         const userCollection = await users();

//         // Check if the user with the given email exists
//         const checkExist = await userCollection.findOne({ email });
//         if (!checkExist) {
//             throw new Error("You may have entered the wrong email address or password.");
//         }

//         // Compare the provided password with the hashed password in the database
//         const checkPassword = await bcrypt.compare(password, checkExist.password);
//         if (!checkPassword) {
//             throw new Error("You may have entered the wrong email address or password.");
//         }

//         // Return user information (excluding the password)
//         return {
//             firstName: checkExist.firstName,
//             lastName: checkExist.lastName,
//             userName: checkExist.userName,
//             email: checkExist.email,
//             DOB: checkExist.DOB,
//         };
//     },

//     async updateUser(userId, updatedData) {
//         const userCollection = await users();

//         // Check if the user with the given ID exists
//         const checkExist = await userCollection.findOne({ _id: ObjectId(userId) });
//         if (!checkExist) {
//             throw new Error("User not found.");
//         }

//         // If there are updates, apply them
//         if (Object.keys(updatedData).length > 0) {
//             // Update user in the collection
//             const updateInfo = await userCollection.findOneAndUpdate(
//                 { _id: ObjectId(userId) },
//                 { $set: updatedData },
//                 { returnDocument: 'after' }
//             );

//             // Check if user was successfully updated
//             if (!updateInfo.ok || !updateInfo.value) {
//                 throw new Error("Could not update user.");
//             }
//         }

//         // Return user information (excluding the password)
//         return {
//             firstName: checkExist.firstName,
//             lastName: checkExist.lastName,
//             userName: checkExist.userName,
//             email: checkExist.email,
//             DOB: checkExist.DOB,
//         };
//     },
// };

// export default userData;
