import React from 'react';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <span className="footer-content">
        © {year}{" "}
        <span className="movie-icon">🎬</span>{" "}
        Gabriel Vizcaino
      </span>
    </footer>
  );
}

export default Footer;