/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	server: {
		host: '0.0.0.0',
	},
	publicRuntimeConfig: {
		AUTH_URL: process.env.AUTH_URL || 'http://localhost:3000',
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				port: '',
			},
		],
	},
}

export default nextConfig
