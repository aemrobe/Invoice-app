/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  devIndicators: false,

  async redirects() {
    return [{ source: "/", destination: "/invoices", permanent: true }];
  },
};

export default nextConfig;
