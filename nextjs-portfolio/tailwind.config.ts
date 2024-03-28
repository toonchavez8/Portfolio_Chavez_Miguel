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
					'50': '#f6f7f7',
					'100': '#e2e5e3',
					'200': '#c5cac7',
					'300': '#a0a8a5',
					'400': '#7c8581',
					'500': '#616b67',
					'600': '#4d5452',
					'700': '#3f4643',
					'800': '#353a37',
					'900': '#2f3231',
					'950': '#1d201f',
				},
				'viridian': {
					'50': '#effef7',
					'100': '#dafeef',
					'200': '#b8fadd',
					'300': '#81f4c3',
					'400': '#43e5a0',
					'500': '#1acd81',
					'600': '#0fa968',
					'700': '#108554',
					'800': '#126945',
					'900': '#11563a',
					'950': '#03301f',
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