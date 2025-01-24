// // require('dotenv').config()  //{path: './env'}
// import dotenv from "dotenv"
// import connectDB from "./db/index.js ";
// import { app } from './app.js';

// dotenv.config() //    path: './.env'
// // console.log('Environment variables loaded:', process.env);
// // console.log('API Key:', process.env.MONGODB_URI);
// // console.log('Port:', process.env.PORT);

// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(` Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err)=>{
//     console.log('MongoDB Connection FAILED', err.message);
// })



import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser';

import { connectDB } from "./db/connectDB.js"
import authRoutes from "./auth-service/routes/user.routes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT||5000;

app.use(cors({origin: "http://localhost:5173", credentials: true}));

app.use(express.json()); // allows parsing of incomming json request :req body
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port ", PORT);
});


