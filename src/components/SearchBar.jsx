import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, onClear }) {
  const [query, setQuery] = useState('');

  // Debounce search - wait 500ms after user stops typing
  useEffect(() => {
    if (query.trim() === '') return;

    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  }

  function handleClear() {
    setQuery('');
    onClear();
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      {query && (
        <button 
          type="button" 
          onClick={handleClear}
          className="clear-button"
        >
          ✕
        </button>
      )}
      <button type="submit" className="search-button">
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBar;