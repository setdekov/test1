import { useEffect } from 'react';
import '../styles/globals.css';

/**
 * Custom App component for Next.js. This is the top-level component that will
 * be common across all the different pages. It registers the service
 * worker for offline support and includes global styles.
 */
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Register the service worker for PWA/offline functionality. The file
    // public/sw.js is generated and kept up to date by the developer. When
    // the app is running on localhost or another development environment,
    // registration will still occur without error.
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch(err => console.warn('Service worker registration failed:', err));
    }
  }, []);

  return <Component {...pageProps} />;
}