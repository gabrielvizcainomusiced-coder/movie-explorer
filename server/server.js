import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://gabrielvizcainomusiced-coder.github.io'
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Search movies
app.get('/api/movies/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

// Get popular movies
app.get('/api/movies/popular', async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

// Get genres
app.get('/api/genres', async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await response.json();
    res.json(data.genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Discover movies by genre
app.get('/api/movies/discover', async (req, res) => {
  try {
    const { genreId } = req.query;
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
    );
    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error('Error discovering movies:', error);
    res.status(500).json({ error: 'Failed to discover movies' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});