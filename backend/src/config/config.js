import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: './.env' });

export const PORT = process.env.PORT || 8000;

// Database connection
export const MONGODB_URI = process.env.MONGODB_URI;

// JWT configurations
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
