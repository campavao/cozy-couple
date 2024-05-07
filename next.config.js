/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.FLUENTFFMPEG_COV": false,
      })
    );

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
