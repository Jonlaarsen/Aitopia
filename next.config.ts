import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images:{
  remotePatterns:[
    {
      protocol:"https",
      hostname:"replicate.delivery"
    },
    {
      protocol:"https",
      hostname:"xpyrgirlmflpqibzmcrv.supabase.co"
    }
  ]
}
};

export default nextConfig;
