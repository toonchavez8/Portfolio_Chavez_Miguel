/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure `pageExtensions` to include standard files
	pageExtensions: ["js", "jsx", "ts", "tsx"],
	// Optionally, add any other Next.js config below
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
