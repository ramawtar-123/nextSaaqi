/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pngegg.com',
        port: '',
      },
    ],
  },

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
