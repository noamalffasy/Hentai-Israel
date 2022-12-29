/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:id',
        destination: '/api/redirectLink'
      }
    ]
  }
};

module.exports = nextConfig;
