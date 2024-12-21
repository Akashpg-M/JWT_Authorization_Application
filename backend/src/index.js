// require('dotenv').config()  //{path: './env'}
// import dotenv from "dotenv"
// import connectDB from "./db/index.js ";

// dotenv.config({
//     path: './.env'
// }) //    path: './.env'
// console.log('Environment variables loaded:', process.env);
// console.log('API Key:', process.env.MONGODB_URI);
// console.log('Port:', process.env.PORT);

// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(` Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err)=>{
//     console.log*"MongoDB Connection FAILED"
// })


import { PORT, MONGODB_URI } from './config/config.js';  // Importing the config
import connectDB from './db/index.js';
import { app } from './app.js';

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('MongoDB Connection FAILED', err.message);
    });



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