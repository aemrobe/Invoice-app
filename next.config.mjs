/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [{ source: "/", destination: "/invoices", permanent: true }];
  },
};

export default nextConfig;
