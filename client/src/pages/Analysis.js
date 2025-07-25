import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from '../axiosConfig';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FaDownload } from 'react-icons/fa';

const COLORS = ['#6366F1', '#10B981', '#F59E0B'];

const Analysis = () => {
  const { isAuthenticated } = useAuth();
  const [recommendation, setRecommendation] = useState(null);
  const [error, setError] = useState(null);
  const reportRef = useRef(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token missing. Please log in again.');
          return;
        }

        const res = await axios.get('/api/advisor', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecommendation(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load recommendations. Please try again later.');
      }
    };

    if (isAuthenticated) {
      fetchRecommendation();
    }
  }, [isAuthenticated]);

  const handleDownload = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('investment_report.pdf');
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold mb-4">Unlock personalized investment insights!</h2>
        <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded mr-4">Login/</Link>
        <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded">Register</Link>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  if (!recommendation) {
    return <p className="text-center mt-10">Loading recommendations...</p>;
  }

  const { allocation, expectedReturn, explanation } = recommendation;

  if (!allocation) {
    return <p className="text-center mt-10">No allocation data available.</p>;
  }

  const data = [
    { name: 'Stocks', value: allocation.stocks },
    { name: 'Mutual Funds', value: allocation.mutualFunds },
    { name: 'Fixed Deposits', value: allocation.fixedDeposits }
  ];

  return (
    <div className="max-w-5xl mx-auto mt-24 p-8 px-6 sm:px-10 bg-white shadow-lg rounded-lg">
      <div ref={reportRef} className="px-4 sm:px-10">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Your Investment Recommendation</h2>

        {/* Pie Chart */}
        <div className="flex justify-center items-center mb-10 pt-6">
          <PieChart width={400} height={350}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>

        {/* Recommendation Summary Box */}
        <div className="bg-gray-50 border border-blue-200 rounded-md p-6 mx-auto mb-10 text-center shadow-sm max-w-3xl">
          <p className="text-lg text-gray-700 mb-4">
            Based on your investment profile, we recommend the following allocation:
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 my-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded shadow font-medium">
              📈 Stocks: <strong>{allocation.stocks}%</strong>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded shadow font-medium">
              📊 Mutual Funds: <strong>{allocation.mutualFunds}%</strong>
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow font-medium">
              🏦 Fixed Deposits: <strong>{allocation.fixedDeposits}%</strong>
            </div>
          </div>

          {/* Only one expected return line */}
          <p className="mt-4 text-lg font-semibold text-indigo-700">
            📌 Expected Annual Return: <span className="text-green-600 font-bold">{expectedReturn}%</span>
          </p>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-6 mb-6">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-lg font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300"
        >
          <FaDownload className="text-xl" />
          Download Report
        </button>
      </div>
    </div>
  );
};

export default Analysis;
