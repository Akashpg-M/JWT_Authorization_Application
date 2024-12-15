const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  address: { type: String, required: true },
  specialties: [{ type: String }],
  contact: {
    phone: { type: String },
    email: { type: String },
  },
  rating: { type: Number, default: 0 },
  facilities: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hospital', hospitalSchema);
