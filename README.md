# NASA Data Explorer

An interactive full-stack application for exploring NASA’s public data:

* **Astronomy Picture of the Day** (APOD)
* **Mars Rover Photos**

---

## Features

* Fetch and display NASA APOD with date selection.
* Browse Mars Rover images by rover and sol, categorized by camera.
* Responsive React UI with loading and error states.
* Dark/Light theme toggle.

---

## Project Structure

```
project-root/
├── backend/               # Express API server
│   ├── config/
│   │   └── nasaApi.js     # Axios instance for NASA API
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   ├── apod.js
│   │   ├── mars.js
│   │   └── neows.js
│   ├── .env               # NASA_API_KEY
│   ├── package.json
│   └── server.js
└── frontend/              # React client
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── nasa.js    # Axios client pointing to backend
    │   ├── components/
    │   │   ├── ApodViewer.jsx
    │   │   ├── MarsPhotos.jsx
    │   │   ├── NeowsList.jsx
    │   │   └── Loader.jsx
    │   ├── App.js
    │   ├── index.js
    │   └── styles.css     # Global styles
    ├── .env.local         # REACT_APP_API_BASE_URL
    └── package.json
```

---

## Setup and Run Locally

### Backend

1. ```bash
   cd backend
   npm install
   ```
2. Create `.env` with your NASA key:

   ```bash
   echo "NASA_API_KEY=YOUR_NASA_API_KEY" > .env
   ```
3. Start server:

   ```bash
   npm start
   ```

   Runs on `http://localhost:4000`.

### Frontend

1. ```bash
   cd frontend
   npm install
   ```
2. Create `.env.local`:

   ```bash
   echo "REACT_APP_API_BASE_URL=http://localhost:4000/api" > .env.local
   ```
3. Start React app:

   ```bash
   npm start
   ```

   Opens at `http://localhost:3000`.

---

## API Endpoints

| Route        | Method | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| `/api/apod`  | GET    | APOD data; optional query `date=YYYY-MM-DD` |
| `/api/mars`  | GET    | Mars photos; query `rover`, `sol`           |
---

