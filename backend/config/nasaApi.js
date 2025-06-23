// config/nasaApi.js
require('dotenv').config();
const axios = require('axios');

module.exports = axios.create({
  baseURL: 'https://api.nasa.gov',
  params: { api_key: process.env.NASA_API_KEY },
  timeout: 10000
});
