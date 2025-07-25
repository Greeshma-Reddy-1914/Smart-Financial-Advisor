import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', formData);
      login(res.data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: 'auto', backgroundColor: '#fdfdfd', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} required />

        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#388e3c',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>Login</button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
