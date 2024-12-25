db/index.js
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`,{ //${process.env.MONGODB_URI}/${DB_NAME}//mongodb+srv://Akash:mongodbakash123@cluster0.dyrul.mongodb.net/FastMed
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch(error) {
        console.log("MongoDB connection FAILED ", error);
        process.exit(1);
    }
}

export default connectDB;

auth.middleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  }catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

user.routes.js
import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, updateAccountDetails, getAllUsers } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh", refreshAccessToken);

// Protected Routes
router.get("/current", verifyJWT, getCurrentUser);
router.put("/update", verifyJWT, updateAccountDetails);

// Route to get all users (can be protected or public depending on your requirements)
router.get("/all", verifyJWT, getAllUsers);  // Use verifyJWT middleware for protected routes if needed

export default router;


user.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res
  const { fullName, email, username, password } = req.body;

  if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  );
});

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  //find the user
  //password check
  //access and referesh token
  //send cookie

  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // For better security in production
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { user: loggedInUser, accessToken, refreshToken }, "User logged in successfully")
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // For better security in production
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // For better security in production
    };

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed")
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

// user.controller.js
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Fetch all users excluding their password and refreshToken fields
    const users = await User.find().select("-password -refreshToken");

    if (!users || users.length === 0) {
      throw new ApiError(404, "No users found");
    }

    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while fetching users");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  getAllUsers,
};

user.model.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  refreshToken: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Check password correctness
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);



ApiError.js
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack) {
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this,constructor)
        }
    }
}

export {ApiError}

ApiResponse.js
class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400

    }
}

export { ApiResponse }

asyncHandler.js
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export { asyncHandler }

app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS Setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, // Corrected key
}));

// Body Parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Static Files
app.use(express.static("public"));

// Cookie Parser
app.use(cookieParser());

//routes import

import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter);

//http://localhost:8000/api/v1/users/register

export { app }



src/index.js
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

Constants.js
export const DB_NAME = "FastMed"



/////////////////////////////////////////////////////////////////////////////////////////////
## Top-Level Structure:
FastMed/
├── frontend/         # Frontend React.js application
├── backend/          # Backend Node.js and Express.js application
├── docs/             # Documentation, project plans, and architecture diagrams
├── scripts/          # Utility scripts for deployment or automation
└── README.md         # Project overview and instructions

## Detailed Frontend Structure:
frontend/
├── public/                    # Static public files (served directly)
│   ├── index.html             # Main HTML file
│   └── favicon.ico            # Favicon
├── src/                       # Application source code
│   ├── assets/                # Static assets like images, icons, styles
│   ├── components/            # Reusable components (e.g., Navbar, Footer)
│   ├── pages/                 # Individual pages for routing
│   │   ├── HomePage.jsx
│   │   ├── ChatbotPage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── AppointmentPage.jsx
│   │   └── PharmacyPage.jsx
│   ├── context/               # Context providers for state management
│   ├── hooks/                 # Custom hooks
│   ├── services/              # API service functions (e.g., fetch APIs)
│   ├── App.js                 # Main app component
│   ├── index.js               # React entry point
│   └── routes.js              # App routing definitions
├── .env                       # Environment variables
├── package.json               # Frontend dependencies
└── README.md                  # Frontend-specific documentation

## Detailed Backend Structure:
backend/
├── src/                       # Source code for backend
│   ├── config/                # Configurations (e.g., database, environment variables)
│   │   ├── db.js              # MongoDB connection logic
│   │   └── dotenv.js          # Environment variable loader
│   ├── controllers/           # Business logic for each feature
│   │   ├── chatbotController.js
│   │   ├── hospitalController.js
│   │   ├── appointmentController.js
│   │   └── pharmacyController.js
|   |   |__ user.controller.js
│   ├── models/                # MongoDB schemas
│   │   ├── user.model.js
│   │   ├── Hospital.js
│   │   ├── Appointment.js
│   │   └── Medicine.js
│   ├── routes/                # API endpoints
│   │   ├── chatbotRoutes.js
│   │   ├── hospitalRoutes.js
│   │   ├── appointmentRoutes.js
│   │   └── pharmacyRoutes.js
|   |   |__ user.routes.js
|   |__ db/
|   |   |__ index.js
│   ├── middlewares/           # Middleware for authentication, error handling
│   │   ├── authMiddleware.js
│   │   
│   ├── utils/                 # Utility functions
│   │   ├── logger.js
│   │   └── responseHelper.js
|   |   |__ ApiError.js
|   |   |__ ApiResponse.js
|   |   |__ asyncHandler.js
│   ├── app.js                 # Express app setup
|   |__ constants.js
|   |__ index.js
│   ├── server.js              # Server entry point
│   └── .env                   # Backend environment variables
|   |__.env.sample
|   |__ .prettierignore
|   |__ .prettierrc
├── package.json               # Backend dependencies
├── README.md                  # Backend-specific documentation

## Scripts Folder:
scripts/
├── deploy-frontend.sh         # Script for deploying the frontend
├── deploy-backend.sh          # Script for deploying the backend
└── db-seed.js                 # Script for seeding initial data to the database

## Docs Folder:
docs/
├── project-plan.md            # Project roadmap and feature breakdown
├── architecture-diagram.png   # System architecture diagram
└── api-documentation.md       # API endpoints and usage