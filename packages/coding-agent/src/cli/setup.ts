import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import chalk from "chalk";
import { CONFIG_DIR_NAME, getAgentDir, getPackageDir } from "../config.js";

export async function runSetup(_args: string[] = []): Promise<number> {
	const targetBase = join(homedir(), CONFIG_DIR_NAME);
	const targetAgent = getAgentDir();

	console.log(chalk.bold(`Setting up Caveman environment in ${targetBase}...`));

	mkdirSync(targetAgent, { recursive: true });

	const candidates = [
		join(getPackageDir(), "..", "..", "templates", "cave"),
		join(getPackageDir(), "templates", "cave"),
		join(getPackageDir(), "dist", "templates", "cave"),
	];
	const templatesDir = candidates.find((d) => existsSync(d));

	if (!templatesDir) {
		console.error(chalk.red("Error: templates/cave directory not found."));
		return 1;
	}

	const filesToCopy = [
		{ src: join(templatesDir, "models.example.json"), dest: join(targetAgent, "models.json"), label: "Models configuration" },
		{ src: join(templatesDir, "models.example.json"), dest: join(targetAgent, "models.example.json"), label: "Models example" },
		{ src: join(templatesDir, "settings.example.json"), dest: join(targetAgent, "settings.json"), label: "Settings configuration" },
		{ src: join(templatesDir, "settings.example.json"), dest: join(targetAgent, "settings.example.json"), label: "Settings example" },
		{ src: join(templatesDir, ".env.example"), dest: join(targetBase, ".env.example"), label: "Environment example" },
		{ src: join(templatesDir, "mcp.example.json"), dest: join(targetBase, "mcp.example.json"), label: "MCP example" },
	];

	for (const { src, dest, label } of filesToCopy) {
		if (!existsSync(src)) continue;
		if (!existsSync(dest)) {
			copyFileSync(src, dest);
			console.log(chalk.green(`  ✓ Created ${label}: ${dest}`));
		} else {
			console.log(chalk.dim(`  - Skipped (already exists): ${dest}`));
		}
	}

	const envFile = join(targetBase, ".env");
	if (!existsSync(envFile)) {
		const envExample = join(templatesDir, ".env.example");
		if (existsSync(envExample)) {
			copyFileSync(envExample, envFile);
			console.log(chalk.green(`  ✓ Created .env: ${envFile}`));
		}
	} else {
		console.log(chalk.dim(`  - Skipped (already exists): ${envFile}`));
	}

	console.log(chalk.bold.green("\n✓ Setup complete!"));
	console.log(chalk.cyan(`You can now edit ${envFile} to add your API keys or run \`caveman\`.\n`));
	return 0;
}
