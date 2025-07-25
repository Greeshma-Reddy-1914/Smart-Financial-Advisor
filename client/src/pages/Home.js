import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div style={{ padding: '20px' }}>
    <h1>Welcome to Smart Financial Advisor</h1>
    <p>Your personalized AI-powered investment planner</p>
    <Link to="/register">
      <button>Get Started</button>
    </Link>
  </div>
);

export default Home;
