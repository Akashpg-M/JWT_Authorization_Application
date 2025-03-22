import mongoose from 'mongoose'
import { User_Auth_Data } from "../constants.js"
export const connectDB = async() => {
    try{
        console.log("Mongodb: ",process.env.MONGODB_URI);
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${User_Auth_Data}`);
        console.log(`MongoDB connected : ${conn.connection.host}`)
    } catch(error){
        console.log("Error connecting to MongoDB:", error.message)
        process.exit(1)// 1 is failure, 0 is success
    }
}