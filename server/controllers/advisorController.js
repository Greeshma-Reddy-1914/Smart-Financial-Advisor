const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.getAdvice = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const profile = user.profile;

    if (!profile || !profile.risk) {
      return res.status(400).json({ message: 'User profile not found' });
    }

    // Load market data
    const marketDataPath = path.join(__dirname, '../data/market_data.json');
    const marketData = JSON.parse(fs.readFileSync(marketDataPath, 'utf-8'));

    // Allocation logic based on risk
    let allocation;
    if (profile.risk === 'High') {
      allocation = { stocks: 70, mutualFunds: 20, fixedDeposits: 10 };
    } else if (profile.risk === 'Medium') {
      allocation = { stocks: 40, mutualFunds: 40, fixedDeposits: 20 };
    } else {
      allocation = { stocks: 10, mutualFunds: 40, fixedDeposits: 50 };
    }

    // Expected return calculation
    const stockGrowth = marketData.stocks.reduce((a, b) => a + b.growth_pct_yoy, 0) / marketData.stocks.length;
    const mfGrowth = marketData.mutual_funds.reduce((a, b) => a + b.return_pct_3y_cagr, 0) / marketData.mutual_funds.length;
    const fdRate = marketData.fixed_deposits.reduce((a, b) => a + b.rate_pct, 0) / marketData.fixed_deposits.length;

    const expectedReturn =
      (allocation.stocks * stockGrowth +
       allocation.mutualFunds * mfGrowth +
       allocation.fixedDeposits * fdRate) / 100;

    const explanation = `Based on your ${profile.risk.toLowerCase()} risk appetite, we've allocated your funds as follows: ` +
      `${allocation.stocks}% in stocks, ${allocation.mutualFunds}% in mutual funds, and ${allocation.fixedDeposits}% in fixed deposits. ` +
      `This gives you an expected return of approximately ${expectedReturn.toFixed(2)}% per year.`;

    res.json({
      allocation,
      expectedReturn: expectedReturn.toFixed(2),
      explanation,
      marketData
    });

  } catch (err) {
    res.status(500).json({ message: 'Error generating advice', error: err.message });
  }
};
