import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../../shared/utils/ApiError.js";
import { asyncHandler } from "../../shared/utils/AsyncHandler.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token:", token); // Log the token
    
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
