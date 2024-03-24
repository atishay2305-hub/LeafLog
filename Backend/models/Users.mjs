import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    DOB: Date,
});

const User = mongoose.model('User', userSchema);

export default User;
