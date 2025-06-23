// src/components/NavBar.jsx
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const tabList = [
  { id: 'apod',  label: 'APOD' },
  { id: 'mars',  label: 'Mars Photos' }
];

export default function NavBar({ selectedTab, onSelectTab, darkMode, toggleDark }) {
  const handleChange = (_, newVal) => onSelectTab(newVal);

  return (
    <AppBar position="sticky" color="primary" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NASA Data Explorer
        </Typography>

        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
        >
          {tabList.map(tab => (
            <Tab key={tab.id} label={tab.label} value={tab.id} />
          ))}
        </Tabs>

        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center' }}>
          <Switch checked={darkMode} onChange={toggleDark} color="default" />
          <Typography variant="body2">{darkMode ? 'Dark' : 'Light'}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
