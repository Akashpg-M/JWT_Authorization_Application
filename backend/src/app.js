// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";

// const app = express();

// // CORS Setup
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true, // Corrected key
// }));

// // Body Parsers
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// // Static Files
// app.use(express.static("public"));

// // Cookie Parser
// app.use(cookieParser());

// //routes import
// import userRouter from './auth-service/routes/user.routes.js'
// // import hospitalRoutes from './auth-service/routes/hospital.routes.js'
// //routes declaration
// app.use("/api/v1/users", userRouter);
// // app.use("/api/v1/hospitals", hospitalRoutes);

// //http://localhost:8000/api/v1/users/register

// export { app }
