const mongoose = require('mongoose');

const weatherSummarySchema = new mongoose.Schema({
  city: String,
  date: Date,
  avgTemp: Number,
  maxTemp: Number,
  minTemp: Number,
  dominantCondition: String
});

module.exports = mongoose.model('WeatherSummary', weatherSummarySchema);