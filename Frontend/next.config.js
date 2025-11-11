/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Desativa o cache do Webpack para evitar problemas de memória
    config.cache = false;
    // Aumenta o limite de memória para o Webpack
    config.performance = {
      maxEntrypointSize: 1024000,
      maxAssetSize: 1024000,
    };
    return config;
  },
};

module.exports = nextConfig;
