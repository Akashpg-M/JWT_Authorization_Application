import { Router } from "express";
import { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';  // Protect routes

const router = Router();

// User Registration and Login Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protect these routes with authMiddleware (auth required)
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

router.delete('/delete-account', authMiddleware, deleteUserAccount);

export default router;
