/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Hostinger shared hosting serves files, not Node — export a static bundle.
  output: 'export',
  // Trailing slashes make Apache/LiteSpeed resolve /about -> /about/index.html.
  trailingSlash: true,
  images: {
    // No Node server means no on-demand optimisation.
    unoptimized: true,
  },
  // three.js ships untranspiled ESM in places; keep the 3D chunk isolated & lazy.
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default nextConfig
