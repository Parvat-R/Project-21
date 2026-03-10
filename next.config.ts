import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" },
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS,PATCH" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
          { key: "Access-Control-Allow-Credentials", value: "true" },
<<<<<<< HEAD
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3001" }, // Use a specific origin for better security
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,POST,PUT,PATCH,OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, Origin" },
=======
>>>>>>> ff791fb1553c2356c76471ec3dde335208d30259
        ],
      },
    ];
  },
};

export default nextConfig;
