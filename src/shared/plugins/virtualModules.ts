import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

export interface VirtualModulesOptions {
	selectedModules?: string[];
}

function virtualModules(options: VirtualModulesOptions = {}): Plugin {
	const modulesDir = path.resolve(__dirname, "../modules");

	const allModules = fs
		.readdirSync(modulesDir)
		.filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"))
		.map((f) => f.replace(/\.(ts|tsx)$/, ""));

	const selected = options.selectedModules ?? [];
	const modules =
		selected.length > 0
			? allModules.filter((m) => selected.includes(m))
			: allModules;

	return {
		name: "virtual-modules",

		async resolveId(id) {
			if (id === "virtual:plugins") return id;
			return null;
		},

		load(id) {
			if (id === "virtual:plugins") {
				const imports = modules
					.map((m) => `import * as ${m} from "@/shared/modules/${m}.ts";`)
					.join("\n");
				const exports = `export { ${modules.join(", ")} };`;

				return `${imports}\n${exports}`;
			}
			return null;
		},
	};
}

export default virtualModules;
