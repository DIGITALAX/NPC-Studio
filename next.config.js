/** @type {import('next').NextConfig} */
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const allowedOrigins = ["https://thedial.infura-ipfs.io"];

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    scrollRestoration: true,
    optimizeCss: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thedial.infura-ipfs.io",
        pathname: "/ipfs/**",
      },
    ],
    unoptimized: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'node_modules/@xmtp/user-preferences-bindings-wasm/dist/node/*.wasm'),
              to: path.resolve(__dirname, '.next/server/vendor-chunks/[name][ext]'),
            },
          ],
        })
      );
    }

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^phaser3spectorjs$/,
      })
    );
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });

    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
    };

    if (!isServer) {
      config.output.webassemblyModuleFilename = "static/wasm/[modulehash].wasm";
    }

    return config;
  },

  trailingSlash: true,
  async headers() {
    let headersConfig = [];

    allowedOrigins.forEach((origin) => {
      headersConfig.push({
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: origin,
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Origin, X-Requested-With, Content-Type, Accept, Authorization",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
        ],
      });
    });

    return headersConfig;
  },
};

module.exports = nextConfig;
