// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utility to return safe user data
const sanitizeUser = (user) => ({
  _id: user._id,
  email: user.email,
  profile: user.profile
});

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, income, expenses, risk, goal, horizon } = req.body;

    if (!name || !email || !password || !income || !expenses || !risk || !goal || !horizon) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username: name,
      email,
      password: hashedPassword,
      profile: {
        name,
        income,
        expenses,
        risk,
        goal,
        horizon
      }
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        token: token  // ✅ send the token here
      }
    });

  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
