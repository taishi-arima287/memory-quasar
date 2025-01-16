/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@memory-quasar/shared"],
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
