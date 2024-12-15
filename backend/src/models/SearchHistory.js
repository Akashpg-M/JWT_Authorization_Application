const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  searchQuery: { type: String, required: true },
  searchDate: { type: Date, default: Date.now },
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' }]
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
