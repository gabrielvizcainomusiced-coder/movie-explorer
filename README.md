# 🎬 Movie Explorer

A modern React application for discovering and exploring movies using The Movie Database (TMDB) API.

![Movie Explorer Homepage](./screenshots/desktop-homepage.png)

## 🌟 Features

- **Search Movies** - Real-time search with debouncing for optimal performance
- **Filter by Genre** - Browse movies by Action, Comedy, Drama, and more
- **Sort Options** - Sort by popularity, rating, release date, or title
- **Favorites System** - Save favorite movies with localStorage persistence
- **Movie Details** - View comprehensive information in an elegant modal
- **Responsive Design** - Fully optimized for desktop, tablet, and mobile
- **Professional UI** - Clean, modern interface inspired by industry-leading platforms

## 🚀 Live Demo

**[View Live Site](https://gabrielvizcainomusiced-coder.github.io/movie-explorer/)**

## 🛠️ Tech Stack

- **React 18** - Component-based UI library
- **Vite** - Next-generation frontend build tool
- **TMDB API** - Movie data and imagery
- **CSS3** - Custom styling with Grid and Flexbox
- **LocalStorage API** - Client-side data persistence
- **GitHub Pages** - Hosting and deployment

## 🏗️ Project Structure

This project uses a client-server architecture for security:

- **client/** - React frontend (Vite)
- **server/** - Express.js backend (handles TMDB API calls)

### Why This Architecture?

The API key is stored **only on the backend** to prevent exposure in the browser. The frontend calls our backend API, which then communicates with TMDB.

## 📋 Key Features Explained

### Search Functionality
- Debounced search (500ms delay) to minimize API calls
- Clear button to reset search quickly
- Real-time results as you type

### Filter & Sort System
- Genre filtering fetches from TMDB's genre endpoint
- Multiple sort options (popularity, rating, date, alphabetical)
- Filters work seamlessly with search results

### Favorites Management
- Add/remove movies with one click
- Persists across browser sessions using localStorage
- Horizontal scrollable favorites bar for quick access
- Visual indicators show which movies are favorited

### Responsive Grid Layout
- CSS Grid with `auto-fill` and `minmax()` for automatic columns
- Adjusts from 6 columns (desktop) to 2 columns (mobile)
- Smooth hover effects and transitions

## 🎨 Design Decisions

- **Dark Theme** - Reduces eye strain and highlights movie posters
- **Blue Accents (#3b82f6)** - Professional color that suggests trust and quality
- **Archivo Font** - Modern, cinema-quality typography
- **Film Strip Icon** - Custom SVG for brand identity
- **Minimal Header** - Maximizes screen space for content

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Backend Setup

1. **Navigate to server folder**
```bash
   cd server
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create environment file**
```bash
   touch .env
```

4. **Add your TMDB API key to `.env`**
```
   TMDB_API_KEY=your_api_key_here
   PORT=5000
```

5. **Start the backend**
```bash
   npm run dev
```
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Open new terminal and navigate to client folder**
```bash
   cd client
```

2. **Install dependencies**
```bash
   npm install
```

3. **Start the development server**
```bash
   npm run dev
```
   App will open at `http://localhost:5173`

### Running Locally (Development)

You need **two terminal windows**:
- Terminal 1: `cd server && npm start` (Backend on port 5000)
- Terminal 2: `cd client && npm run dev` (Frontend on port 5173)

**Note:** The live demo uses the deployed backend on Render, so you don't need to run the server locally to view the GitHub Pages site.

## 🚢 Deployment

### Frontend (GitHub Pages)
From the `client` folder:
```bash
npm run deploy
```

### Backend (Render)
The backend auto-deploys when you push to the `main` branch on GitHub.

### Backend Deployment (Render)

The backend is deployed on Render at:
**https://movie-explorer-api-h7gx.onrender.com**

To deploy your own instance:
1. Create a free account at [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the following:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variable: `TMDB_API_KEY=your_key_here`

## 📁 Project Structure
```
movie-explorer/
├── client/                     # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   ├── MovieDetail.jsx
│   │   │   ├── FavoritesList.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Footer.jsx
│   │   ├── services/
│   │   │   └── tmdbAPI.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend (Express.js)
│   ├── server.js
│   ├── package.json
│   └── .env                   # Not in repo
├── screenshots/
│   ├── desktop-homepage.png
│   ├── search-results.png
│   ├── movie-detail-modal.png
│   ├── favorites-section.png
│   └── mobile-view.png
├── .gitignore
└── README.md
```
## 🔑 Key Code Concepts

### State Management
- Uses React hooks (`useState`, `useEffect`, `useCallback`)
- Centralized state in App.jsx
- Props drilling for component communication
- LocalStorage for persistence

### API Integration
- Async/await for clean asynchronous code
- Try-catch error handling
- Multiple endpoints (search, popular, discover, genres)
- Image URL helper function

### Performance Optimizations
- Debounced search to reduce API calls
- useCallback to prevent unnecessary re-renders
- CSS animations with hardware acceleration
- Lazy loading of modal content

### API Configuration
- Frontend calls backend API (not TMDB directly)
- Backend URL configured in `client/src/services/tmdbAPI.js`
- Production: `https://movie-explorer-api-h7gx.onrender.com`
- Development: `http://localhost:5000`

## 🎯 Future Enhancements

- [ ] Movie trailers (YouTube integration)
- [ ] User reviews and ratings
- [ ] Watchlist separate from favorites
- [ ] Dark/Light mode toggle
- [ ] Similar movies recommendations
- [ ] Infinite scroll pagination
- [ ] Advanced filters (year range, rating range)

## 📸 Screenshots

### Desktop Homepage
![Desktop Homepage](./screenshots/desktop-homepage.png)

### Search Results
![Search Results](./screenshots/search-results.png)

### Movie Detail Modal
![Movie Detail](./screenshots/movie-detail-modal.png)

### Favorites Section
![Favorites](./screenshots/favorites-section.png)

### Mobile View
![Mobile View](./screenshots/mobile-view.png)


## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to open an issue or reach out.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gabriel Vizcaino**

- Portfolio: in progress...
- GitHub: [@gabrielvizcainomusiced-coder](https://github.com/gabrielvizcainomusiced-coder)
- LinkedIn: (https://www.linkedin.com/in/gabriel-vizcaino-502304396/)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the excellent API
- [React](https://react.dev/) for the amazing framework
- [Vite](https://vitejs.dev/) for the blazing-fast build tool
- Design inspiration from [Letterboxd](https://letterboxd.com/) and [OMDb](https://www.omdbapi.com/)

---

**Built with AI assistance for automated tasks using prompt engineering