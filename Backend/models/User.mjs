import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: String, // Assuming Google ID is stored as a string
  // Add other fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
