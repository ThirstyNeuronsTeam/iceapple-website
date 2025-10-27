import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.xml$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
