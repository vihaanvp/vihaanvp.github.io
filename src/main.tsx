import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Handle GitHub Pages 404 redirects for SPA routing
// When GitHub Pages serves a 404, it redirects to index.html with query params
// This script extracts the path from the query and redirects to it
(function() {
  const location = window.location;
  // Check if we have a redirect from 404.html (format: ?/path)
  if (location.search[1] === '/') {
    const path = location.search.slice(1).split('&')[0].replace(/~and~/g, '&');
    const base = import.meta.env.BASE_URL;
    // Replace the current URL with the correct path
    window.history.replaceState(null, '', base + path.slice(1) + location.hash);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
