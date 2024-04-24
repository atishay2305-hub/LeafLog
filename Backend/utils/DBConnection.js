import mongoose from 'mongoose';

const DBconnection = async () => {
    const connectionUrl = 'mongodb+srv://atishay2305:d1N73QqeRIPbIlAS@leaflog.qc1rin7.mongodb.net/?retryWrites=true&w=majority&appName=leaflog'; 
    mongoose.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log(`Database connected successfully`))
        .catch((err) => console.log("Getting Error from DB connection" + err.message))
    mongoose.set('strictQuery', false);
};

export default DBconnection;