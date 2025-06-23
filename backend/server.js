require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apodRoute = require('./routes/apod');
const marsRoute = require('./routes/mars');
const neowsRoute = require('./routes/neows');
const errorHandler = require('./middleware/errorHandler');
import express from 'express';
import cors from 'cors';


const app = express();

// allow your React dev server to hit this API
app.use(
  cors({
    origin: 'http://localhost:3000'
  })
);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Backend up!' }));
app.use('/api/apod', apodRoute);
app.use('/api/mars', marsRoute);
app.use('/api/neows', neowsRoute);

app.use((req, res) => res.status(404).json({ error: { message: 'Not Found' } }));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Listening on http://localhost:${PORT}`));