import bcryptjs from "bcryptjs";
import crypto from "crypto"

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
    console.log("Received request body:", req.body); 
    const { email, password, username, phone} = req.body;

    try{
        if(!email || !password || !username || !phone){
            console.error("Validation failed: Missing fields", { email, password, username, phone });
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        
        if(userAlreadyExists){
            return res.status(400).json({success:false, message : "User Already Exist"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            username,
            phone,
            verificationToken,
            verificationTokenExpiresAt: Date.now()+ 24 * 60 * 60 * 1000//24 hours
        })

        await user.save();

        generateTokenAndSetCookie(res, user._id)

        await sendVerificationEmail(user.email, verificationToken);
        
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user:{
                ...user._doc,
                password: undefined 
            },
        }); 
    } catch(error) {
        res.status(400).json({success : false, message: error.message});
    }
};

export const verifyEmail = async(req, res) => {
    try{
        const { code } = req.body;

        console.log("Received code:", code); // Log the code sent in the request

        // const user = await User.findOne({
        //     verificationToken: code,
        //     verificationTokenExpirersAt: {$gt: Date.now()},
        // });
        const user = await User.findOne({
            verificationToken: code, // Token in the database matches the code sent in the request
            verificationTokenExpiresAt: { $gt: new Date() }, // Check if the token has not expired
        });
        
        console.log("User Name: ", user);

        if(!user){
            return res.status(400).json({success: false, message: "invalid code"});
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.username);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    }catch(error) {
        res.status(500).json({success : false, message: error.message});
    }
}

export const login = async (req, res)=>{
    // res.send("login Routes");
    const { email, password } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }
    
        generateTokenAndSetCookie(res, user._id);

        user.lastlogin = new Date();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    }catch(error) {
        console.log("Error in login ", error);
        res.status(400).json({success : false, message: error.message});
    }    
};

export const logout = async (req, res)=>{
    res.clearCookie("token");
    res.status(200).json({success: true, message: "Logged out successfully"});
};

export const forgotPassword = async  (req, res) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success: false, message: "user not found"});
        }

        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: "Password reset link sent to your email"});

    }catch(error){
        console.log("Error in forgotPassword ", error);
        res.status(400).json({success: false, message: error.message});
    }
}

export const resetPassword = async(req, res) => {
     try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()},
        });

        console.log("USER: ", user);
        
        if(!user){
            return res.status(400).json({success : false, message: "invalid or Epiered reset token"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined,
        user.resetPasswordExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({success: true, message: " password reset Successfull"})
     }catch(error){
        console.log("Error in the resetPassword", error);
        res.status(400).json({success: false, message: error.message});
     }
}

export const checkAuth = async(req, res) => {
    try {
        console.log("UserId: ",req.userId);
        const user = await User.findById(req.userId).select("-password");
        console.log("Username : ", user);
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json({ success: true, user});

    }catch(error){
        console.log("Error in checkAuth ", error);
        res.status(400).json({success: false, message: error.message});  
    }
}