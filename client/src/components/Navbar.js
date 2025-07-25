import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#1976d2', color: 'white' }}>
      <div>
        <Link to="/" style={navStyle}>Home</Link>
        {!isAuthenticated && (
          <Link to="/login" style={navStyle}>Login</Link>
        )}
        <Link to="/profile" style={navStyle}>Profile</Link>
        <Link to="/analysis" style={navStyle}>Analysis</Link>
      </div>
      {isAuthenticated && (
        <button onClick={logout} style={{ backgroundColor: 'white', color: '#1976d2', padding: '6px 12px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      )}
    </nav>
  );
};

const navStyle = {
  color: 'white',
  marginRight: '20px',
  textDecoration: 'none',
  fontWeight: '500',
  fontSize: '16px'
};

export default Navbar;
