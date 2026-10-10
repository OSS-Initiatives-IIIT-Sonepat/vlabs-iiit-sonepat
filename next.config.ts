import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
        protocol: "https",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/labs/opamp-circuits",
        destination: "/labs/inverting-non-inverting-opamp",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/(images|illustrations|lottie)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
