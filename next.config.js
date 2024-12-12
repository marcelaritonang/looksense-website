/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Ini menggantikan `next export`
  basePath: '/looksense.github.io', // Sub-path untuk GitHub Pages
  assetPrefix: '/looksense.github.io', // Prefix untuk semua aset
};

module.exports = nextConfig;
