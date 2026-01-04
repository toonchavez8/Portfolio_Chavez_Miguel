/** Tailwind CSS config for this app.
 * Enables class-based dark mode so `next-themes` toggling
 * the `dark` class on <html> works with `dark:` utilities.
 */

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
