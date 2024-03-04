import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-geist-sans)"],
				mono: ["var(--font-geist-mono)"],
			},
		},
	},
	plugins: [require("daisyui")],
	darkMode: "class",
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#192BC2",
					secondary: "#16F4D0",
					accent: "#0000ff",
					neutral: "#050508",
					"base-100": "#FBFBFF",
					info: "#7E8D85",
					success: "#22c55e",
					warning: "#facc15",
					error: "#e11d48",
				},
			},
		],
	},
};
export default config;
