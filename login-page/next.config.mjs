/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backend = process.env.BACKEND_URL || 'http://localhost:8080'
    return [
      { source: '/api/login', destination: `${backend}/login` },
      { source: '/api/register', destination: `${backend}/register` },
    ]
  },
}

export default nextConfig
