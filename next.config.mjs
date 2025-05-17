let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads.warrity.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ]
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  generateBuildId: () => 'development',
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  // Explicitly disable Pages Router
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
}

// Merge configurations
const finalConfig = {
  ...nextConfig,
  ...(userConfig?.default || {}),
}

// Deep merge experimental config
if (userConfig?.default?.experimental) {
  finalConfig.experimental = {
    ...nextConfig.experimental,
    ...userConfig.default.experimental,
  }
}

export default finalConfig
