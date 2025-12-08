/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone', // Optimize for serverless deployment
    experimental: {
        optimizePackageImports: ['lucide-react', 'motion'], // Tree-shake large packages
    },
}

module.exports = nextConfig
