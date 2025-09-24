import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption, loadEnv, type ConfigEnv } from "vite";
import checker from "vite-plugin-checker";
import viteCompression from "vite-plugin-compression";
import Inspect from "vite-plugin-inspect";
import svgr from "vite-plugin-svgr";
import virtualModules from "./src/shared/plugins/virtualModules";

export default ({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd());
	const selectedModules = env.VITE_SELECTED_MODULES?.split(",") || [];

	return defineConfig({
		plugins: [
			tailwindcss(),
			react(),
			virtualModules({
				selectedModules: selectedModules,
			}),
			svgr(),
			checker({
				typescript: true,
				biome: {
					command: "check",
				},
			}),
			viteCompression({
				algorithm: "brotliCompress",
				ext: ".br",
			}),
			Inspect(),
		],
		build: {
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
				format: {
					comments: false,
				},
			},
			rollupOptions: {
				plugins: [
					visualizer({
						filename: "dist/stats.html",
						open: true,
					}) as PluginOption,
				],
			},
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "src"),
			},
		},
	});
};
