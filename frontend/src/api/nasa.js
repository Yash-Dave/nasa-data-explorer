// frontend/src/api/nasa.js
import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE_URL;
const API = axios.create({ baseURL: API_BASE });
// Now these call your backend, which already has the key in backend/.env
export const fetchApod       = (date) => API.get('/apod',       { params: date ? { date } : {} }).then(r => r.data);
export const fetchMarsPhotos = (rover, sol) => API.get('/mars', { params: { rover, sol } }).then(r => r.data);
