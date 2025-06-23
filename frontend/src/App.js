// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Box
} from '@mui/material';
import NavBar from './components/NavBar';
import ApodViewer from './components/ApodViewer';
import MarsPhotos from './components/MarsPhotos';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState('apod');

  // define your theme, making sure background.default is what you expect
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#121212' : '#f5f5f5', // page bg
        paper:   darkMode ? '#1e1e1e' : '#ffffff'  // cards, containers
      }
    }
  });

  // toggle the "dark" class on the <html> (optional)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      {/* This injects MUI's global styles, including setting
          body { background-color: theme.palette.background.default } */}
      <CssBaseline />

      {/* Wrap everything in a Box so that its background covers the full viewport */}
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor:  'background.default',
          color:   'text.primary',
        }}
      >
        <NavBar
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          darkMode={darkMode}
          toggleDark={() => setDarkMode(m => !m)}
        />

        <Container maxWidth="md" sx={{ py: 4 }}>
          {selectedTab === 'apod' && <ApodViewer />}
          {selectedTab === 'mars' && <MarsPhotos />}
          {/* …other tabs */}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
