import React from 'react';
import { getImageUrl } from '../services/tmdbAPI';

function MovieDetail({ movie, onClose, onToggleFavorite, isFavorite }) {
  if (!movie) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <img 
            src={getImageUrl(movie.poster_path, 'w500')} 
            alt={movie.title}
            className="modal-poster"
          />
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <div className="modal-meta">
              <span className="rating">⭐ {movie.vote_average.toFixed(1)}/10</span>
              <span className="year">{movie.release_date?.slice(0, 4) || 'N/A'}</span>
              <span className="language">{movie.original_language.toUpperCase()}</span>
            </div>
            <button 
              className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
              onClick={onToggleFavorite}
            >
              {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>

        <div className="modal-body">
          <h3>Overview</h3>
          <p>{movie.overview || 'No overview available.'}</p>
          
          <div className="movie-stats">
            <div className="stat">
              <strong>Popularity:</strong> {movie.popularity.toFixed(0)}
            </div>
            <div className="stat">
              <strong>Vote Count:</strong> {movie.vote_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;