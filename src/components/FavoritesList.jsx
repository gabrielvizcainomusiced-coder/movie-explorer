import React from 'react';
import { getImageUrl } from '../services/tmdbAPI';

function FavoritesList({ favorites, onMovieClick }) {
  if (favorites.length === 0) {
    return null; // Don't show section if no favorites
  }

  return (
    <div className="favorites-section">
      <h2 className="section-title">❤️ My Favorites ({favorites.length})</h2>
      <div className="favorites-scroll">
        {favorites.map((movie) => (
          <div 
            key={movie.id} 
            className="favorite-item"
            onClick={() => onMovieClick(movie)}
          >
            <img 
              src={getImageUrl(movie.poster_path, 'w342')} 
              alt={movie.title}
            />
            <div className="favorite-item-info">
              <div className="favorite-item-title">{movie.title}</div>
              <div className="favorite-item-rating">⭐ {movie.vote_average.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesList;