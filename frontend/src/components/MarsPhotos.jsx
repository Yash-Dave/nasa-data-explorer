

import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent
} from '@mui/material';
import { fetchMarsPhotos } from '../api/nasa';

export default function MarsPhotos() {
  const [rover, setRover] = useState('curiosity');
  const [sol, setSol] = useState(1000);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState(null);

  // Load photos from API
  const loadPhotos = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { photos: fetched } = await fetchMarsPhotos(rover, sol);
      setPhotos(fetched || []);
      setSelectedCamera(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  // Group photos by camera full_name
  const grouped = useMemo(() => {
    return photos.reduce((acc, p) => {
      const cam = p.camera.full_name;
      if (!acc[cam]) acc[cam] = [];
      acc[cam].push(p);
      return acc;
    }, {});
  }, [photos]);

  // Prepare category data: each card shows cameraName and cover image
  const categories = useMemo(() => {
    return Object.entries(grouped).map(([cameraName, camPhotos]) => ({
      cameraName,
      coverUrl: camPhotos[0]?.img_src.replace(/^http:\/\//, 'https://'),
      count: camPhotos.length
    }));
  }, [grouped]);

  // Photos for selected category
  const gallery = selectedCamera ? grouped[selectedCamera] : [];

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Mars Rover Photos
      </Typography>

      {/* Filter Controls */}
      <Box component="form" onSubmit={loadPhotos} sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          select
          label="Rover"
          value={rover}
          onChange={e => setRover(e.target.value)}
          SelectProps={{ native: true }}
          sx={{ minWidth: 140 }}
        >
          {['curiosity', 'opportunity', 'spirit'].map(r => (
            <option key={r} value={r}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </option>
          ))}
        </TextField>
        <TextField
          label="Sol (Martian day)"
          type="number"
          value={sol}
          onChange={e => setSol(Number(e.target.value))}
          sx={{ width: 120 }}
        />
        <Button variant="contained" type="submit">
          Fetch
        </Button>
      </Box>

      {/* Category Grid View */}
      {!selectedCamera && (
        <Grid container spacing={2}>
          {categories.map(({ cameraName, coverUrl }) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={cameraName}>
              <Card onClick={() => setSelectedCamera(cameraName)} sx={{ cursor: 'pointer' }}>
                <CardActionArea>
                  {coverUrl && (
                    <CardMedia
                      component="img"
                      image={coverUrl}
                      alt={cameraName}
                      sx={{ height: 100, objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ py: 1, px: 1 }}>
                    <Typography variant="body2" align="center" noWrap>
                      {cameraName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Gallery View for Selected Camera */}
      {selectedCamera && (
        <>
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => setSelectedCamera(null)}>
              ← Back
            </Button>
            <Typography variant="h6" sx={{ ml: 2 }}>
              {selectedCamera} ({gallery.length})
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {gallery.map(photo => (
              <Grid item xs={6} sm={4} md={3} key={photo.id}>
                <Card>
                  <CardActionArea
                    href={photo.img_src.replace(/^http:\/\//, 'https://')}
                    target="_blank"
                  >
                    <CardMedia
                      component="img"
                      image={photo.img_src.replace(/^http:\/\//, 'https://')}
                      alt={selectedCamera}
                      sx={{ height: 120, objectFit: 'cover' }}
                    />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}

