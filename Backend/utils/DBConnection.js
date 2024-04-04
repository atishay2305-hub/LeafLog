import mongoose from 'mongoose';

// Connecting to database
const DBconnection = async () => {
    const connectionUrl = 'mongodb://localhost:27017/loginsystem'; // Replace 'your_database_name' with the name of your database
    mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Database connected successfully`))
        .catch((err) => console.log("Getting Error from DB connection" + err.message))
    mongoose.set('strictQuery', false);
};

export default DBconnection;