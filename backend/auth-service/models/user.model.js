import mongoose from "mongoose"; 

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
  },
  currentLocation: {
    latitude: { type: Number },
    longitude: { type: Number },
  },
  refreshToken: { type: String },

  lastlogin: {
    type: Date,
    default : Date.now
  },

  isVerified:{
    type : Boolean,
    default: false
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);

