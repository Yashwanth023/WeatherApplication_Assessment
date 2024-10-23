# Real-Time Weather Monitoring System

## Description

This Real-Time Weather Monitoring System is an application that fetches and displays weather data for multiple cities. It provides daily weather summaries, visualizations, and allows users to set temperature alerts.

## Features

- Fetch real-time weather data from OpenWeatherMap API
- Display daily weather summaries for multiple cities
- Visualize weather data using charts
- Set temperature alerts
- Automatic data refresh every 5 minutes

## Technologies Used

- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js, Recharts (for charts)
- External API: OpenWeatherMap

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)
- npm (v6 or later)
- OpenWeatherMap API key

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Yashwanth023/WeatherApplication_Assessment.git
    cd weather-monitoring-system
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the backend directory with the following content:
    ```bash
    MONGODB_URI=mongodb://localhost:27017/weather-monitoring
    PORT=3000
    OPENWEATHERMAP_API_KEY=your_api_key_here
    ```
    Replace `your_api_key_here` with your actual OpenWeatherMap API key.

## Running the Application

1. Start the MongoDB server (if not already running)

2. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

3. In a new terminal, start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3001` to access the application

## Usage

1. **View Weather Dashboard:**
    - The main page displays weather summaries for multiple cities
    - Each city card shows average, maximum, and minimum temperatures, as well as the dominant weather condition
    - Weather data is automatically refreshed every 5 minutes

2. **Set Temperature Alerts:**
    - Use the Alert Settings panel in the top right corner
    - Enter a temperature threshold and click "Set Alert"
    - You will receive alerts when the temperature exceeds the set threshold

3. **View Weather Charts:**
    - Each city card includes a chart visualizing temperature trends

## API Endpoints

- `GET /api/weather/summary`: Get weather summaries for all monitored cities
- `POST /api/alerts/settings`: Update alert settings

## Customization

To add or remove cities from monitoring, edit the `CITIES` array in the `backend/services/weatherService.js` file.
