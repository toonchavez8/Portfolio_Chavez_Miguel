import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
	content: [
		"./app/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "class",
	theme: {
		screens:{
			"xs": "375px",
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1440px',
		},
		extend: {
			typography: {
				DEFAULT: {
				  css: {
					figure:false,
					maxWidth: '100ch', // add required value here
				  }
				}
			  },
			fontFamily: {
				sans: ["var(--font-geist-sans)"],
				mono: ["var(--font-geist-mono)"],
			},
			colors: {
				'shark': {
					'50': 'oklch(97.54% 0.00 197.14)',
					'100': 'oklch(91.90% 0.00 157.17)',
					'200': 'oklch(83.42% 0.01 160.04)',
					'300': 'oklch(72.43% 0.01 171.68)',
					'400': 'oklch(60.80% 0.01 167.55)',
					'500': 'oklch(51.80% 0.01 169.85)',
					'600': 'oklch(43.89% 0.01 176.92)',
					'700': 'oklch(38.67% 0.01 168.22)',
					'800': 'oklch(34.26% 0.01 159.65)',
					'900': 'oklch(31.38% 0.00 174.16)',
					'950': 'oklch(24.00% 0.00 173.99)',
				},
				'viridian': {
					'50': 'oklch(97.28% 0.01 161.35)',
					'100': 'oklch(93.21% 0.02 156.81)',
					'200': 'oklch(86.63% 0.04 160.52)',
					'300': 'oklch(77.08% 0.05 163.70)',
					'400': 'oklch(65.84% 0.07 163.06)',
					'500': 'oklch(55.81% 0.08 164.03)',
					'600': 'oklch(47.16% 0.07 164.97)',
					'700': 'oklch(40.65% 0.05 166.82)',
					'800': 'oklch(35.08% 0.04 167.09)',
					'900': 'oklch(31.23% 0.04 167.38)',
					'950': 'oklch(22.06% 0.02 174.37)',
				},

			},
		},
	},
	plugins: [
		require("daisyui"),
		require("@tailwindcss/typography"),
		addVariablesForColors,
		function ({ matchUtilities, theme }: any) {
		  matchUtilities(
			{
			  "bg-grid": (value: any) => ({
				backgroundImage: `url("${svgToDataUri(
				  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
				)}")`,
			  }),
			  "bg-grid-small": (value: any) => ({
				backgroundImage: `url("${svgToDataUri(
				  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
				)}")`,
			  }),
			  "bg-dot": (value: any) => ({
				backgroundImage: `url("${svgToDataUri(
				  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
				)}")`,
			  }),
			},
			{ values: flattenColorPalette(theme("backgroundColor")), type: "color" }
		  );
		},
	  ],
	daisyui: {
		themes: [
			{
				mytheme: {
					"primary": "#616b67",
					"secondary": "#3f4643",
					"accent": "#a0a8a5",
					"neutral": "#0e0e11",
					"base-100": "#f6f7f7",
					"info": "#4b86ac",
					"success": "#468268",
					"warning": "#ff6c00",
					"error": "#b01900",
							 },
			},
		],
	},
};
export default config;


function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);

	addBase({
	  ":root": newVars,
	});
  }