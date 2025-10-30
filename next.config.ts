import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const withMDX = createMDX()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
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

export default withMDX(nextConfig)
