/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  transpilePackages: ["@memory-quasar/shared"],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
