import User from '../models/User.js';
import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from 'jsonwebtoken';
// import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } from '../config/config.js';
import winston from 'winston';

// Logger Setup
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ name, email, password, phone });
    await newUser.save();

    const token = newUser.generateAccessToken();
    res.status(201).json({ token });
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAccessToken();
    res.json({ token });
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { name, email, phone, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { name, email, phone, address },
        { new: true }
    );

    res.json({ updatedUser });
});

// Delete User Account
export const deleteUserAccount = asyncHandler(async (req, res) => {
    const userId = req.userId; // Use userId from middleware
    const deletedUser = await User.findByIdAndDelete(userId); // Delete the user from the database
    if (!deletedUser) {
        logger.warn(`Attempted to delete non-existent user: ${userId}`);
        return res.status(404).json({ message: 'User not found.' });
    }
    logger.info(`User account deleted successfully: ${userId}`);
    res.status(200).json({ message: 'Your account has been deleted successfully.' });
});
