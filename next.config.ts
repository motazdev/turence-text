import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: import("next").NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.IMAGE_REMOTE_HOSTNAME || "**",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
