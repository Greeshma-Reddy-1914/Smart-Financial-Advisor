// server/models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: Number,
  income: Number,
  expenses: Number,
  goals: String,
  riskAppetite: String
});

module.exports = mongoose.model('Profile', profileSchema);
