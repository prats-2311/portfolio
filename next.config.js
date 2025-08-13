/** @type {import('next').NextConfig} */
const repoName = 'portfolio';
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;