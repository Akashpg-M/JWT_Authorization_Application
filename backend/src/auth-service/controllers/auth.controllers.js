import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
    const { email, password, username, phone} = req.body;

    try{
        if(!email || !password || !username || !phone){
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

export const login = async (req, res)=>{
    res.send("login Routes");
}

export const logout = async (req, res)=>{
    res.send("logout Routes");
}