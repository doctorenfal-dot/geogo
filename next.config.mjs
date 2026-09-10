/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/geogo',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
