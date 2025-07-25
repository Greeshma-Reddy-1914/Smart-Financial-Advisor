// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      {isLoggedIn && <Link to="/recommendations">Recommendations</Link>}
      {!isLoggedIn ? <Link to="/signin">Sign In</Link> : <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
};

export default Navbar;
