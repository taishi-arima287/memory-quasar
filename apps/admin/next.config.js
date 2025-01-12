/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@memory-quasar/ui'],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig; 