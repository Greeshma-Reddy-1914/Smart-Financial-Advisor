// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000', // Or your actual backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
