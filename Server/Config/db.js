const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGO_URL ;
const dbConnect = async () => {
    try{
        await mongoose.connect(url); 
        console.log(`MongoDB connected successfully`);
        
    }catch(err){
        console.log("DB error",err.message);
    }
}

module.exports = dbConnect;