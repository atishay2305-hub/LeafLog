// next.config.js

const nextConfig = {
    // Define custom routes
    redirects: async () => [
      {
        source: '/',
        destination: '/index',
        permanent: true, // or false if you want temporary redirect
      },
    ],
  };
  
  export default nextConfig;
  