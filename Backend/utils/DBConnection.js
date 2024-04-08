import mongoose from 'mongoose';

// Connecting to database
const DBconnection = async () => {
    const connectionUrl = 'mongodb://localhost:27017/leaflog'; 
    mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Database connected successfully`))
        .catch((err) => console.log("Getting Error from DB connection" + err.message))
    mongoose.set('strictQuery', false);
};

export default DBconnection;