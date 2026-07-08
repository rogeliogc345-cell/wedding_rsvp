import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "gspjaeugjvrmbrjuwocr.supabase.co",
                pathname: "/storage/v1/object/public/**",
            },
        ],
        qualities: [75, 90],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "5mb",
        },
    },
};

export default nextConfig;
