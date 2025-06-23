// src/components/ApodViewer.jsx
import React, { useState, useEffect } from 'react';
import { fetchApod } from '../api/nasa';
import { Card, CardContent, CardMedia, Typography, CircularProgress, TextField, Button, Box } from '@mui/material';

export default function ApodViewer() {
  const [date, setDate] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async (evt) => {
    if (evt) evt.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const apod = await fetchApod(date);
      setData(apod);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom> Astronomy Picture of the Day </Typography>

      <Box component="form" onSubmit={load} sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Fetch'}
        </Button>
      </Box>

      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <Card>
          <CardMedia
            component="img"
            image={data.url}
            alt={data.title}
            sx={{ maxHeight: 500, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6">{data.title}</Typography>
            <Typography variant="body2" color="textSecondary">{data.date}</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>{data.explanation}</Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
