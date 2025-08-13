/** @type {import('next').NextConfig} */
const repoName = 'portfolio';
const isProd = process.env.NODE_ENV === 'production';
// Add this to detect custom domain deployment
const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === 'true';

const nextConfig = {
  output: 'export',
  // Only use basePath for GitHub Pages, not for custom domain
  basePath: isProd && !isCustomDomain ? `/${repoName}` : '',
  assetPrefix: isProd && !isCustomDomain ? `/${repoName}/` : '',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["images.unsplash.com"],
  },
};

module.exports = nextConfig;






// /** @type {import('next').NextConfig} */
// const repoName = 'portfolio';
// const isProd = process.env.NODE_ENV === 'production';

// const nextConfig = {
//   output: 'export',
//   basePath: isProd ? `/${repoName}` : '',
//   assetPrefix: isProd ? `/${repoName}/` : '',
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//     domains: ["images.unsplash.com"],
//   },
// };

// module.exports = nextConfig;

