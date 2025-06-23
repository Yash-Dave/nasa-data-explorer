import React, { useState, useEffect } from 'react';
import { fetchNeoFeed } from '../api/nasa';

export default function NeowsList() {
  const [neos, setNeos]   = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always <= 7 days
    fetchNeoFeed('2025-06-16', '2025-06-22')
      .then(data => {
        // data.near_earth_objects is an object keyed by date
        setNeos(Object.values(data.near_earth_objects).flat());
      })
      .catch(err => setError(err.message));
  }, []);  // ← here

  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {neos.map(o => (
        <li key={o.id}>{o.name} – {o.close_approach_data[0].close_approach_date}</li>
      ))}
    </ul>
  );
}
