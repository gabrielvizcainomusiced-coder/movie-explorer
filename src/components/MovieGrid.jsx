import React from 'react';
import MovieCard from './MovieCard';

function MovieGrid({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies found. Try searching for something else!</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;