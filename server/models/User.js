// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true }, // This will hold "name"
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    name: { type: String, required: true },
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    risk: { type: String, required: true },
    goal: { type: String, required: true },
    horizon: { type: Number, required: true }
  }
});

module.exports = mongoose.model('User', UserSchema);
