import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import LoadingSpinner from './components/LoadingSpinner';
import Footer from './components/Footer';
import { searchMovies, getPopularMovies } from './services/tmdbAPI';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        
        <h2 className="section-title">
          {searchTerm ? `Results for "${searchTerm}"` : 'Popular Movies'}
        </h2>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <MovieGrid movies={movies} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;