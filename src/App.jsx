import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import LoadingSpinner from './components/LoadingSpinner';
import MovieDetail from './components/MovieDetail';
import FavoritesList from './components/FavoritesList';
import Footer from './components/Footer';
import { searchMovies, getPopularMovies } from './services/tmdbAPI';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Load popular movies on initial render
  useEffect(() => {
    async function loadPopularMovies() {
      setLoading(true);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setLoading(false);
    }
    loadPopularMovies();
  }, []);

  // Handle search
  async function handleSearch(query) {
    setSearchTerm(query);
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setLoading(false);
  }

  // Handle movie click (open modal)
  function handleMovieClick(movie) {
    setSelectedMovie(movie);
  }

  // Close modal
  function closeModal() {
    setSelectedMovie(null);
  }

  // Toggle favorite
  function toggleFavorite(movie) {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === movie.id);
      
      if (isAlreadyFavorite) {
        // Remove from favorites
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        // Add to favorites
        return [...prevFavorites, movie];
      }
    });
  }

  // Check if a movie is favorited
  function isFavorite(movie) {
    return favorites.some(fav => fav.id === movie.id);
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        
        {/* Show favorites if user has any */}
        {favorites.length > 0 && (
          <FavoritesList 
            favorites={favorites} 
            onMovieClick={handleMovieClick}
          />
        )}

        <h2 className="section-title">
          {searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <MovieGrid movies={movies} onMovieClick={handleMovieClick} />
        )}
      </main>

      {/* Modal for movie details */}
      {selectedMovie && (
        <MovieDetail 
          movie={selectedMovie}
          onClose={closeModal}
          onToggleFavorite={() => toggleFavorite(selectedMovie)}
          isFavorite={isFavorite(selectedMovie)}
        />
      )}

      <Footer />
    </div>
  );
}

export default App;