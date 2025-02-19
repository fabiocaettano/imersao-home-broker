import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [`${process.env.DOMAIN}`]
  }
};

export default nextConfig;
