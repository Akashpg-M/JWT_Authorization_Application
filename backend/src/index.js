// require('dotenv').config()  //{path: './env'}
import dotenv from "dotenv"
import connectDB from "./db/index.js ";

dotenv.config({
    path: './.env'
}) //    path: './.env'
console.log('Environment variables loaded:', process.env);
console.log('API Key:', process.env.MONGODB_URI);
console.log('Port:', process.env.PORT);
connectDB()


// import express from "express";
// const app = express();
// ( async => {
//     try{
//         await mongoose.connect(`${process.env.
//         MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.log("ERRR: ", error);
//             throw error
//         })

//         app.listen(process.env.PORT, () =>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error){
//         console.error("ERROR : ", error)
//         throw error
//     }
// })