// import { Router } from "express";
// import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/user.controller.js';
// import { authMiddleware } from '../middlewares/authMiddleware.js';  // Protect routes

// const router = Router();

// // User Registration and Login Routes
// router.post('/register', registerUser);
// router.post('/login', loginUser);

// // Protect these routes with authMiddleware (auth required)
// router.get('/profile', authMiddleware, getUserProfile);
// router.put('/profile', authMiddleware, updateUserProfile);

// router.delete('/delete-account', authMiddleware, deleteUserAccount);

// export default router;

////////////////////////////////////////////////////////////////////////////////////////

// user.routes.js
import express from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, updateAccountDetails, getAllUsers, changeCurrentPassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",verifyJWT, logoutUser);
router.post("/refresh", refreshAccessToken);

// Protected Routes
router.get("/current", verifyJWT, getCurrentUser);
router.put("/update", verifyJWT, updateAccountDetails);
router.put("/change-password", verifyJWT, changeCurrentPassword);

// Route to get all users (can be protected or public depending on your requirements)
router.get("/all", getAllUsers);  // Use verifyJWT middleware for protected routes if needed

export default router;


////////////////////////////////////////////////////////////////////////////////
/*
import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory, 
    updateAccountDetails
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router
*/