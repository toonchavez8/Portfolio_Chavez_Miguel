import { resolve } from "path";

export default {
	root: resolve(__dirname, "src"),
	build: {
		outDir: "../dist",
		rollupOptions: {
			input: {
				main: resolve(__dirname, "./src/index.html"),
				about: resolve(__dirname, "./src/pages/about.html"),
				contact: resolve(__dirname, "./src/pages/contact.html"),
				services: resolve(__dirname, "./src/pages/services.html"),
				projects: resolve(__dirname, "./src/pages/projects.html"),
			},
		},
	},
	resolve: {
		alias: {
			"~bootstrap": resolve(__dirname, "../node_modules/bootstrap"),
		},
	},
	server: {
		port: 8080,
		hot: true,
	},
};
