/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.API_HOSTNAME,
        port: process.env.API_PORT,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
