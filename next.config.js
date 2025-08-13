/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/portfolio',

    // Add this to exclude blog routes from build
    pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
};

module.exports = nextConfig;
