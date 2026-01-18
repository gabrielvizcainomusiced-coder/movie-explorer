import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import MovieGrid from './components/MovieGrid';
import LoadingSpinner from './components/LoadingSpinner';
import MovieDetail from './components/MovieDetail';
import FavoritesList from './components/FavoritesList';
import Footer from './components/Footer';
import { searchMovies, getPopularMovies, discoverMoviesByGenre } from './services/tmdbAPI';

function App() {
  const [movies, setMovies] = useState([]);
  const [displayMovies, setDisplayMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity');

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

  // Apply filters and sorting whenever movies, genre, or sort changes
  useEffect(() => {
    let filtered = [...movies];

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter(movie => 
        movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // Sort
    switch (selectedSort) {
      case 'rating':
        filtered.sort((a, b) => b.vote_average - a.vote_average);
        break;
      case 'release_date':
        filtered.sort((a, b) => {
          const dateA = new Date(a.release_date || '1900-01-01');
          const dateB = new Date(b.release_date || '1900-01-01');
          return dateB - dateA;
        });
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    setDisplayMovies(filtered);
  }, [movies, selectedGenre, selectedSort]);

  // Handle search with useCallback to prevent re-renders
  const handleSearch = useCallback(async (query) => {
    setSearchTerm(query);
    setLoading(true);
    const results = await searchMovies(query);
    setMovies(results);
    setSelectedGenre(''); // Reset genre filter on search
    setLoading(false);
  }, []);

  // Handle clear search
  async function handleClearSearch() {
    setSearchTerm('');
    setSelectedGenre('');
    setLoading(true);
    const popularMovies = await getPopularMovies();
    setMovies(popularMovies);
    setLoading(false);
  }

  // Handle genre change
  async function handleGenreChange(genreId) {
    setSelectedGenre(genreId);
    if (genreId && !searchTerm) {
      setLoading(true);
      const genreMovies = await discoverMoviesByGenre(genreId);
      setMovies(genreMovies);
      setLoading(false);
    }
  }

  // Handle sort change
  function handleSortChange(sortType) {
    setSelectedSort(sortType);
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
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
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
        <SearchBar 
          onSearch={handleSearch} 
          onClear={handleClearSearch}
        />

        <FilterBar 
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          selectedGenre={selectedGenre}
          selectedSort={selectedSort}
        />
        
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
          <MovieGrid movies={displayMovies} onMovieClick={handleMovieClick} />
        )}
      </main>

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