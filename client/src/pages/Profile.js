import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Profile = () => {
  const { isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const res = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-4">Join us to unlock your personalized profile!</h2>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded mr-4">Login/</Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">Register</Link>
      </div>
    );
  }

  if (!profile) return <p className="text-center mt-10">Loading your profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <ul className="space-y-2 text-lg">
        <li><strong>Name:</strong> {profile.name || 'Not set'}</li>
        <li><strong>Monthly Income:</strong> ₹{profile.income || 0}</li>
        <li><strong>Monthly Expenses:</strong> ₹{profile.expenses || 0}</li>
        <li><strong>Risk Appetite:</strong> {profile.risk || 'Not set'}</li>
        <li><strong>Financial Goal:</strong> {profile.goal || 'Not set'}</li>
        <li><strong>Investment Horizon:</strong> {profile.horizon || 0} years</li>
      </ul>
    </div>
  );
};

export default Profile;
