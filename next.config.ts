/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: '*.myshopify.com' },
       {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ]
  }
};
export default nextConfig;

