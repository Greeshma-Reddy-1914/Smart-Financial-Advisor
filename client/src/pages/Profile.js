import React, { useContext, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`/api/users/${user._id}`)
        .then((res) => setProfile(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-4">Join us to unlock your personalized profile!</h2>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded mr-4">Login</Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">Register</Link>
      </div>
    );
  }

  if (!profile) return <p className="text-center mt-10">Loading your profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <ul className="space-y-2 text-lg">
        <li><strong>Name:</strong> {profile.name}</li>
        <li><strong>Monthly Income:</strong> ₹{profile.income}</li>
        <li><strong>Monthly Expenses:</strong> ₹{profile.expenses}</li>
        <li><strong>Risk Appetite:</strong> {profile.risk}</li>
        <li><strong>Financial Goal:</strong> {profile.goal}</li>
        <li><strong>Investment Horizon:</strong> {profile.horizon} years</li>
      </ul>
    </div>
  );
};

export default Profile;
