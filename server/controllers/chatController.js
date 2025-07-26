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
    const msgRaw = req.body.message || '';
    const msg = msgRaw.toLowerCase().trim();
    let response = "I'm still learning. Can you rephrase your question?";

    // Normalize common typos
    const normalized = msg.replace(/rish/g, 'risk');

    // --- Specific conditions ---

    if (normalized.includes('risk is low')) {
      response = `A low-risk appetite suggests prioritizing capital safety. Recommended allocation: 10% stocks, 40% mutual funds, and 50% fixed deposits.`;
    } else if (normalized.includes('risk is medium')) {
      response = `With medium risk, you'd balance growth and safety: 40% stocks, 40% mutual funds, and 20% fixed deposits. This provides moderate returns with manageable risk.`;
    } else if (normalized.includes('risk is high')) {
      response = `A high-risk appetite favors aggressive growth. Recommended allocation: 70% stocks, 20% mutual funds, and 10% fixed deposits. Expect higher returns but more volatility.`;
    }

    // Salary / income increase
    else if (
      (normalized.includes('salary') || normalized.includes('income')) &&
      (normalized.includes('increase') || normalized.includes('more') || normalized.includes('raise'))
    ) {
      response = `An increase in salary or income gives you more disposable money to invest. It's a great time to revisit your goals and possibly increase contributions to high-return investments.`;
    }

    // Expenses decrease
    else if (
      normalized.includes('expenses') &&
      (normalized.includes('decrease') || normalized.includes('cut') || normalized.includes('reduced'))
    ) {
      response = `With lower expenses, your savings rate improves. You can now invest more towards your financial goals or even explore diversified asset options.`;
    }

    // Income up + expenses down
    else if (
      (normalized.includes('income') || normalized.includes('salary')) &&
      (normalized.includes('increase') || normalized.includes('raise')) &&
      normalized.includes('expenses') &&
      (normalized.includes('decrease') || normalized.includes('cut'))
    ) {
      response = `Higher salary and reduced expenses mean more surplus income. It's a great opportunity to increase investments, achieve goals faster, and build a more aggressive portfolio if your risk allows.`;
    }

    // Investing more
    else if (normalized.includes('invest more')) {
      response = `Investing more each month will increase your long-term wealth. Based on your ${profile.risk} risk appetite, you'd allocate more towards ${profile.risk === 'High' ? 'stocks' : 'mutual funds and fixed deposits'}.`;
    }

    // Retire earlier
    else if (normalized.includes('retire') && normalized.includes('earlier')) {
      response = `Retiring earlier shortens your investment horizon. You may need to shift to safer investments and save more aggressively.`;
    }

    // Horizon longer
    else if (
      normalized.includes('horizon') &&
      (normalized.includes('increase') || normalized.includes('longer') || normalized.includes('more years'))
    ) {
      response = `A longer investment horizon allows for more equity exposure, helping grow your wealth over time with higher returns.`;
    }

    // Horizon shorter
    else if (
      normalized.includes('horizon') &&
      (normalized.includes('decrease') || normalized.includes('shorter') || normalized.includes('less years'))
    ) {
      response = `A shorter horizon calls for low-risk instruments like fixed deposits and short-term mutual funds to protect your capital.`;
    }

    // Goal changes
    else if (normalized.includes('goal') && (normalized.includes('change') || normalized.includes('new'))) {
      response = `Changing your financial goal may require adjusting how much you invest and for how long. Update your plan to stay on track.`;
    } else if (normalized.includes('goal') && normalized.includes('house')) {
      response = `Buying a house is a major goal. Consider safe, medium-term options like debt mutual funds or recurring deposits to accumulate funds without much risk.`;
    }

    res.json({ response });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ response: 'Server error while processing chat.' });
  }
};
