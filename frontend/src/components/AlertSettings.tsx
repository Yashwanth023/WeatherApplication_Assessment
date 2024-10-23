import React, { useState } from 'react';
import axios from 'axios';

const AlertSettings: React.FC = () => {
  const [tempThreshold, setTempThreshold] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/alerts/settings', { tempThreshold: parseFloat(tempThreshold) });
      setMessage('Alert settings updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to update alert settings. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '1rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#2563eb' }}>Alert Settings</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="number"
          value={tempThreshold}
          onChange={(e) => setTempThreshold(e.target.value)}
          placeholder="Temperature Threshold (°C)"
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '1rem'
          }}
          required
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer'
          }}
        >
          Set Alert
        </button>
      </form>
      {message && (
        <div style={{
          marginTop: '0.5rem',
          fontSize: '0.875rem',
          color: message.includes('successfully') ? '#16a34a' : '#dc2626'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default AlertSettings;