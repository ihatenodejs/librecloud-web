import type { NextConfig } from "next"

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "git.pontusmail.org",
        port: "",
        pathname: "**",
      },
    ],
  },
}

export default nextConfig
