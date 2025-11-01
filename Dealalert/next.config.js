// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use React's strict mode for better component testing and warnings
  reactStrictMode: true, 
  
  // CRITICAL for image optimization in Next.js
  images: {
    // Allows Next.js to pull images from your Airtable attachments
    // The domain 'dl.airtable.com' is where Airtable hosts public file links.
    domains: ['dl.airtable.com'], 
  },
  
  // We recommend changing the pages directory in Next.js to 'src/pages'
  // to keep all code inside the 'src' folder.
  // Note: This requires manually moving all your pages into a new folder named 'pages' 
  // at the root level if you don't do the full migration into /src/pages. 
  // Since we are migrating, we assume the code will be correctly placed in /src/pages.
};

module.exports = nextConfig;