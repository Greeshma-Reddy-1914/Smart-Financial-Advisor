const User = require('../models/User');

exports.chatResponse = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ response: 'Unauthorized. Please log in.' });

    const user = await User.findById(userId);
    if (!user || !user.profile) return res.status(404).json({ response: 'No profile found for user.' });

    const msgRaw = req.body.message || '';
    const msg = msgRaw.toLowerCase().trim();

    // Normalize common typos
    let normalized = msg.replace(/rish/g, 'risk');

    const { profile } = user;
    let response = "I'm still learning. Can you rephrase your question?";

    // ---------------------------- BASIC CONDITIONS ----------------------------

    if (normalized.includes('risk is low')) {
      response = `A low-risk appetite suggests prioritizing capital safety. Allocation: 10% stocks, 40% mutual funds, 50% fixed deposits.`;
    } else if (normalized.includes('risk is medium')) {
      response = `With medium risk, you'd balance growth and safety: 40% stocks, 40% mutual funds, 20% fixed deposits.`;
    } else if (normalized.includes('risk is high')) {
      response = `A high-risk appetite favors aggressive growth. Allocation: 70% stocks, 20% mutual funds, 10% fixed deposits.`;
    }

    // ---------------------------- SALARY & EXPENSES ----------------------------

    const salaryUp = normalized.includes('salary increase') || normalized.includes('income increase') || normalized.includes('salary goes up');
    const salaryDown = normalized.includes('salary decrease') || normalized.includes('income decrease') || normalized.includes('salary goes down');
    const expensesUp = normalized.includes('expenses increase') || normalized.includes('expenses go up');
    const expensesDown = normalized.includes('expenses decrease') || normalized.includes('expenses go down') || normalized.includes('expenses reduced');

    if (salaryDown && expensesUp) {
      response = `This combination puts pressure on your savings. Consider reducing discretionary spending and prioritizing essential investments.`;
    } else if (salaryDown && expensesDown) {
      response = `If both salary and expenses decrease, your net savings may remain stable. Track your monthly budget closely to adjust investments accordingly.`;
    } else if (salaryUp && expensesDown) {
      response = `Higher salary and reduced expenses increase your investable surplus. Great time to boost contributions and reach goals faster.`;
    } else if (salaryUp) {
      response = `Increased income gives more flexibility to invest or upgrade goals. Consider increasing SIPs or exploring equity-heavy options.`;
    } else if (salaryDown) {
      response = `With reduced income, you may need to cut back on investments or pause risky allocations. Focus on essentials and stable returns.`;
    } else if (expensesDown) {
      response = `Lower expenses improve savings. Use this opportunity to invest more or pay off debt faster.`;
    } else if (expensesUp) {
      response = `Higher expenses reduce savings. Revisit your monthly plan and possibly shift to safer, liquid investments.`;
    }

    // ---------------------------- GOALS ----------------------------

    if (normalized.includes('goal') && normalized.includes('buy') && normalized.includes('house')) {
      response = `Buying a house is a major goal. Choose safer, mid-term investments like debt mutual funds or recurring deposits to build the corpus.`;
    } else if (normalized.includes('goal') && normalized.includes('change')) {
      response = `Changing your financial goal may require adjusting your investment amount, risk strategy, and timeline. Recalculate accordingly.`;
    }

    // ---------------------------- RETIREMENT ----------------------------

    if (normalized.includes('retire') && (normalized.includes('early') || normalized.includes('earlier'))) {
      response = `Retiring early shortens your investment horizon. You'll need to save more aggressively and may want to shift towards safer investments sooner.`;
    } else if (normalized.includes('retire') && normalized.includes('late')) {
      response = `Delaying retirement gives you a longer investment horizon. You can stay in high-growth instruments longer and potentially increase your retirement corpus.`;
    }

    // ---------------------------- INVESTMENT HORIZON ----------------------------

    const matchHorizon = normalized.match(/horizon.*?(\d+)\s*(year|yr|yrs)?/);

    if (matchHorizon) {
      const years = parseInt(matchHorizon[1]);
      if (years <= 3) {
        response = `With a ${years}-year horizon, prioritize capital protection: fixed deposits, short-term debt funds, or liquid funds.`;
      } else if (years <= 7) {
        response = `A ${years}-year horizon allows moderate risk. Mix equity and debt funds to balance growth and safety.`;
      } else {
        response = `A long-term horizon of ${years} years suits equity investments. Consider index funds, diversified mutual funds, and stocks for higher returns.`;
      }
    }

    // ---------------------------- INVEST MORE ----------------------------

    if (normalized.includes('invest more')) {
      response = `Investing more helps you reach your goals faster. Based on your ${profile.risk} risk, increase allocations to ${profile.risk === 'High' ? 'stocks' : 'mutual funds and fixed deposits'}.`;
    }

    res.json({ response });

  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ response: 'Server error while processing chat.' });
  }
};
