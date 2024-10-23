require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');
const weatherService = require('./services/weatherService');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: 'http://localhost:3001' }))

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Schedule weather data fetching
cron.schedule('*/5 * * * *', () => {
  console.log('Fetching weather data...');
  weatherService.fetchAndStoreWeatherData();
});

// Routes
app.get('/api/weather/summary', async (req, res) => {
  try {
    const summary = await weatherService.getDailyWeatherSummary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});