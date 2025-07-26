// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const advisorRoutes = require('./routes/advisor');
const chatRoutes = require('./routes/chatRoutes'); // ✅ ADDED

const app = express();

// ✅ Proper CORS setup
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

// ✅ Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/chat', chatRoutes); // ✅ ADDED

// ✅ Root Route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// ✅ Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => console.error('DB connection error:', err));
