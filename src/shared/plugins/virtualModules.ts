import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

export type VirtualModulesOptions = {
	selectedModules?: string[];
};

function virtualModules(options: VirtualModulesOptions = {}): Plugin {
	const modulesDir = path.resolve(__dirname, "../modules");

	const allModules = fs
		.readdirSync(modulesDir)
		.filter((f) => f.endsWith(".ts") || f.endsWith(".js"))
		.map((f) => f.replace(/\.(ts|js)$/, ""));

	const selected = options.selectedModules ?? [];
	const modules = allModules.filter((m) => selected.includes(m));

	return {
		name: "vite-virtual-modules",

		async resolveId(id) {
			if (id === "virtual:plugins") return id;
			return null;
		},

		load(id) {
			if (id === "virtual:plugins") {
				const imports = modules
					.map((m) => `import "${path.posix.join("/src/shared/modules", m)}";`)
					.join("\n");

				return `${imports}`;
			}
			return null;
		},
	};
}

export default virtualModules;
