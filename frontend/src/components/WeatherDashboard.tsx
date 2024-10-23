// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import WeatherChart from './WeatherChart';
// import AlertSettings from './AlertSettings';

// interface WeatherSummary {
//   city: string;
//   date: string;
//   avgTemp: number;
//   maxTemp: number;
//   minTemp: number;
//   dominantCondition: string;
// }

// const WeatherDashboard: React.FC = () => {
//   const [summaries, setSummaries] = useState<WeatherSummary[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchWeatherSummary = async () => {
//       try {
//         const response = await axios.get<WeatherSummary[]>('http://localhost:3000/api/weather/summary');
//         setSummaries(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching weather summary:', error);
//         setError('Failed to fetch weather data. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchWeatherSummary();
//     const interval = setInterval(fetchWeatherSummary, 300000); // Refresh every 5 minutes

//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8">Weather Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {summaries.map((summary) => (
//           <div key={`${summary.city}-${summary.date}`} className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-2xl font-semibold mb-4">{summary.city}</h2>
//             <p className="mb-2">Date: {new Date(summary.date).toLocaleDateString()}</p>
//             <p className="mb-2">Average Temperature: {summary.avgTemp.toFixed(1)}°C</p>
//             <p className="mb-2">Max Temperature: {summary.maxTemp.toFixed(1)}°C</p>
//             <p className="mb-2">Min Temperature: {summary.minTemp.toFixed(1)}°C</p>
//             <p className="mb-2">Dominant Condition: {summary.dominantCondition}</p>
//             <WeatherChart data={[summary]} />
//           </div>
//         ))}
//       </div>
//       <AlertSettings />
//     </div>
//   );
// };

// export default WeatherDashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherChart from './WeatherChart';
import AlertSettings from './AlertSettings';

interface WeatherSummary {
  city: string;
  date: string;
  avgTemp: number;
  maxTemp: number;
  minTemp: number;
  dominantCondition: string;
}

const WeatherDashboard: React.FC = () => {
  const [summaries, setSummaries] = useState<WeatherSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeatherSummary = async () => {
      try {
        const response = await axios.get<WeatherSummary[]>('http://localhost:3000/api/weather/summary');
        setSummaries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather summary:', error);
        setError('Failed to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWeatherSummary();
    const interval = setInterval(fetchWeatherSummary, 300000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', marginTop: '2rem', color: '#dc2626', fontSize: '1.2rem' }}>{error}</div>;
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem 1rem',
      backgroundColor: '#f0f9ff',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#1e40af' 
        }}>Weather Dashboard</h1>
        <div style={{ width: '250px' }}>
          <AlertSettings />
        </div>
      </div>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {summaries.map((summary) => (
          <div key={`${summary.city}-${summary.date}`} style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#2563eb' }}>{summary.city}</h2>
            <p style={{ marginBottom: '0.5rem' }}>Date: {new Date(summary.date).toLocaleDateString()}</p>
            <p style={{ marginBottom: '0.5rem' }}>Average Temperature: <span style={{ fontWeight: '600' }}>{summary.avgTemp.toFixed(1)}°C</span></p>
            <p style={{ marginBottom: '0.5rem' }}>Max Temperature: <span style={{ color: '#dc2626', fontWeight: '600' }}>{summary.maxTemp.toFixed(1)}°C</span></p>
            <p style={{ marginBottom: '0.5rem' }}>Min Temperature: <span style={{ color: '#2563eb', fontWeight: '600' }}>{summary.minTemp.toFixed(1)}°C</span></p>
            <p style={{ marginBottom: '1rem' }}>Dominant Condition: <span style={{ fontWeight: '600' }}>{summary.dominantCondition}</span></p>
            <WeatherChart data={[summary]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDashboard;