import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from '../axiosConfig';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Analysis = () => {
  const { isAuthenticated, user } = useAuth();
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      axios.get(`/api/analysis/${user._id}`)
        .then((res) => setRecommendation(res.data))
        .catch((err) => console.error(err));
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-4">Unlock personalized investment insights!</h2>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded mr-4">Login</Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">Register</Link>
      </div>
    );
  }

  if (!recommendation) return <p className="text-center mt-10">Loading recommendations...</p>;

  const { allocation, expected_return, explanation } = recommendation;
  const data = [
    { name: 'Stocks', value: allocation.stocks },
    { name: 'Mutual Funds', value: allocation.mutualFunds },
    { name: 'Fixed Deposits', value: allocation.fd }
  ];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Investment Recommendation</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      <p className="mt-6 text-lg"><strong>Expected Returns:</strong> {expected_return}%</p>
      <p className="mt-2 italic text-gray-700">{explanation}</p>
    </div>
  );
};

export default Analysis;
