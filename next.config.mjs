/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    proxyTimeout: 300000,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gitfolio.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://10.0.105.44/api/auth/:path*",
      },
      {
        source: "/api/members/:path*",
        destination: "http://10.0.105.44:81/api/members/:path*",
      },
      {
        source: "/api/resumes/:path*",
        destination: "http://10.0.105.75/api/resumes/:path*",
      },
    ];
  },
};

export default nextConfig;
