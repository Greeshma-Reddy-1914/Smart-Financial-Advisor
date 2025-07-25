// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const advisorRoutes = require('./routes/advisor');

const app = express(); // ✅ Move this above route use statements

// ✅ Proper CORS setup for credentials
app.use(cors({
  origin: 'http://localhost:3000', // Only allow React frontend
  credentials: true                // Allow cookies, auth headers
}));

app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/advisor', advisorRoutes);

// ✅ Sample route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// ✅ DB Connection + Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => console.error('DB connection error:', err));
