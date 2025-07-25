// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Recommendations from './pages/Recommendations';

const isAuthenticated = () => !!localStorage.getItem('token');

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/signin" />} />
        <Route path="/recommendations" element={isAuthenticated() ? <Recommendations /> : <Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
};

export default App;
