import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <WeatherDashboard />
    </div>
  );
};

export default App;