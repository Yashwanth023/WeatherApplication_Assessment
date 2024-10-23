const axios = require('axios');
const WeatherData = require('../models/weatherData');
const WeatherSummary = require('../models/weatherSummary');

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const CITIES = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

async function fetchAndStoreWeatherData() {
  for (const city of CITIES) {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${API_KEY}`);
      const { main, weather, dt } = response.data;
      
      const weatherData = new WeatherData({
        city,
        main: weather[0].main,
        temp: main.temp - 273.15, // Convert from Kelvin to Celsius
        feels_like: main.feels_like - 273.15,
        dt: new Date(dt * 1000)
      });

      await weatherData.save();
      console.log(`Weather data saved for ${city}`);
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error.message);
    }
  }
}

async function getDailyWeatherSummary() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const summaries = await WeatherData.aggregate([
    {
      $match: {
        dt: { $gte: today }
      }
    },
    {
      $group: {
        _id: { city: '$city', date: { $dateToString: { format: '%Y-%m-%d', date: '$dt' } } },
        avgTemp: { $avg: '$temp' },
        maxTemp: { $max: '$temp' },
        minTemp: { $min: '$temp' },
        conditions: { $push: '$main' }
      }
    },
    {
      $project: {
        city: '$_id.city',
        date: '$_id.date',
        avgTemp: { $round: ['$avgTemp', 2] },
        maxTemp: { $round: ['$maxTemp', 2] },
        minTemp: { $round: ['$minTemp', 2] },
        dominantCondition: { $arrayElemAt: ['$conditions', 0] }
      }
    },
    {
      $sort: { city: 1, date: 1 }
    }
  ]);

  return summaries;
}

module.exports = { fetchAndStoreWeatherData, getDailyWeatherSummary };