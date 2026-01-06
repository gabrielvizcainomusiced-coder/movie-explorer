import React from 'react';
import { getImageUrl } from '../services/tmdbAPI';

function MovieCard({ movie, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick(movie)}>
      <img 
        src={getImageUrl(movie.poster_path)} 
        alt={movie.title}
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="year">
            {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;