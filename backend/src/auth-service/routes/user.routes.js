// import express from "express";
// import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, updateAccountDetails, getAllUsers, changeCurrentPassword } from "../controllers/user.controllers.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// // Public Routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/logout",verifyJWT, logoutUser);
// router.post("/refresh", refreshAccessToken);

// // Protected Routes
// router.get("/current", verifyJWT, getCurrentUser);
// router.put("/update", verifyJWT, updateAccountDetails);
// router.put("/change-password", verifyJWT, changeCurrentPassword);

// // Route to get all users (can be protected or public depending on your requirements)
// router.get("/all", getAllUsers);  // Use verifyJWT middleware for protected routes if needed

// export default router;

import express from "express";
import {signup, verifyEmail, login, logout, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);

router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;