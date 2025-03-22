import jwt from "jsonwebtoken"

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("token", token, {
        httpsOnly: true,
        secure: process.env.NODE_ENV === "production",
        samesite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return token;
}