import React, { useState, useEffect } from 'react';
import { getGenres } from '../services/tmdbAPI';

function FilterBar({ onGenreChange, onSortChange, selectedGenre, selectedSort }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function loadGenres() {
      const genreList = await getGenres();
      setGenres(genreList);
    }
    loadGenres();
  }, []);

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="genre-filter">Genre:</label>
        <select 
          id="genre-filter"
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort By:</label>
        <select 
          id="sort-filter"
          value={selectedSort} 
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="release_date">Release Date</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;