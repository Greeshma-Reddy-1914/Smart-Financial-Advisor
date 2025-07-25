const User = require('../models/User');

exports.saveProfile = async (req, res) => {
  try {
    const { name, income, expenses, risk, goal, horizon } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        profile: { name, income, expenses, risk, goal, horizon }
      },
      { new: true }
    );
    res.json({ message: 'Profile saved', profile: user.profile });
  } catch (err) {
    res.status(500).json({ message: 'Error saving profile', error: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ profile: user.profile });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
};
