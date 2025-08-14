/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "res.cloudinary.com",
      pathname: "**",
    }],
  },
  // Solo si usas Turbopack (Next.js 13+):
  experimental: {
    turbo: {
      resolveAlias: {
        "@": "./src",  // Mapea "@" a "./src"
      },
    },
  },
};

export default nextConfig;
