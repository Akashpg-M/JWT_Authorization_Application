import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId; // Set the userId to the request for further access
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
