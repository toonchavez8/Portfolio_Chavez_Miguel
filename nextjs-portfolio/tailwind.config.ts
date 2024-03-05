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
			colors: {
				asphalt: {
					"50": "#fff3e6",
					"100": "#ffe1bd",
					"200": "#ffc17e",
					"300": "#ff9435",
					"400": "#ff6c00",
					"500": "#ff5100",
					"600": "#de3100",
					"700": "#b01900",
					"800": "#911002",
					"900": "#7a0e09",
					"950": "#0a0000",
				},
			},
		},
	},
	plugins: [require("daisyui")],
	darkMode: "class",
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#ff5100",
					secondary: "#b01900",
					accent: "#ff6c00",
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
