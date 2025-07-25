import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    income: '',
    expenses: '',
    risk: 'Medium',
    goal: '',
    horizon: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
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
    <div style={{ padding: '30px', maxWidth: '500px', margin: 'auto', backgroundColor: '#fafafa', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={inputStyle} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={inputStyle} required />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} style={inputStyle} required />

        <label>Monthly Income (₹):</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} style={inputStyle} required />

        <label>Monthly Expenses (₹):</label>
        <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} style={inputStyle} required />

        <label>Risk Appetite:</label>
        <select name="risk" value={formData.risk} onChange={handleChange} style={inputStyle} required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <label>Financial Goal:</label>
        <input type="text" name="goal" value={formData.goal} onChange={handleChange} style={inputStyle} required />

        <label>Investment Horizon (Years):</label>
        <input type="number" name="horizon" value={formData.horizon} onChange={handleChange} style={inputStyle} required />

        <button type="submit" style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#1976d2',
          color: 'white',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>Register</button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}

      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        Already a user? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
