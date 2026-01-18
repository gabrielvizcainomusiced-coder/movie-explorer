// Point to your production backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://movie-explorer-api-h7gx.onrender.com/api';

// Search movies by title
export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies/search?query=${query}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
}

// Get popular movies
export async function getPopularMovies() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies/popular`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
}

// Get movie genres
export async function getGenres() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/genres`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
}

// Discover movies by genre
export async function discoverMoviesByGenre(genreId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/movies/discover?genreId=${genreId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error discovering movies:', error);
    return [];
  }
}

// Helper to get full image URL
export function getImageUrl(path, size = 'w500') {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
}