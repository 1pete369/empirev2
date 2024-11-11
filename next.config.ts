/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Protocol specification
        hostname: 'lh3.googleusercontent.com', // Hostname specification
        pathname: '/**', // Allow all paths
      },
    ],
    domains: ['picsum.photos'], // Add additional domains as needed
  },
  async headers() {
    return [
      {
        // Applies CORS headers to all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // Replace "*" with your domain if needed
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
};

module.exports = nextConfig;
