/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
<<<<<<< HEAD
        hostname: '**.unsplash.com',
=======
        hostname: '**.pngegg.com',
>>>>>>> e6e92dd5243aea305757ec529aa276860607fd41
        port: '',
      },
    ],
  },
<<<<<<< HEAD
=======

>>>>>>> e6e92dd5243aea305757ec529aa276860607fd41
    async headers() {
      return [
        {
          source: "/login",
          headers: [
            {
              key: "Cross-Origin-Embedder-Policy",
              value: "unsafe-none",
            },
          ],
          
        },
        
      ];
    },
    reactStrictMode: false,
  };

export default nextConfig;
