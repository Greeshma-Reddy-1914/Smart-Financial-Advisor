// controllers/chatController.js
const User = require('../models/User');
const marketData = require('../data/market_data.json');

exports.chatResponse = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ response: 'Unauthorized. Please log in.' });
    }

    const user = await User.findById(userId);
    if (!user || !user.profile) {
      return res.status(404).json({ response: 'No profile found for user.' });
    }

    const { profile } = user;
    const msg = req.body.message?.toLowerCase() || '';
    let response = "I'm still learning. Can you rephrase your question?";

    if (msg.includes('invest more')) {
      response = `Investing more each month will increase your long-term wealth. Based on your ${profile.risk} risk appetite, you'd allocate more towards ${profile.risk === 'High' ? 'stocks' : 'mutual funds and fixed deposits'} for higher returns.`;
    } else if (msg.includes('retire') && msg.includes('earlier')) {
      response = `Retiring earlier shortens your investment horizon. This often requires more conservative investments like fixed deposits or balanced funds.`;
    } else if (msg.includes('expenses')) {
      response = `Higher expenses reduce your monthly savings, which limits how much you can invest. You might need to adjust your financial goals or investment horizon.`;
    }

    res.json({ response });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ response: 'Server error while processing chat.' });
  }
};
