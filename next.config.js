/**
 * Basic Next.js configuration for the booking platform.
 *
 * PWA functionality (manifest and service worker) is handled manually in the
 * `public/manifest.json` and `public/sw.js` files. When building the
 * production version of this app you should ensure that the service
 * worker is registered from within `_app.js`.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // You can extend this configuration as your project grows. For example,
  // configure image domains or i18n support here.
  images: {
    domains: [],
  },
};

module.exports = nextConfig;