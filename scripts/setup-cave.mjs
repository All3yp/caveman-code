#!/usr/bin/env node

import { existsSync, copyFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const templatesDir = join(repoRoot, "templates", "cave");

const targetBase = join(homedir(), ".cave");
const targetAgent = join(targetBase, "agent");

console.log(`Setting up Caveman environment in ${targetBase}...`);

mkdirSync(targetAgent, { recursive: true });

const filesToCopy = [
	{ src: join(templatesDir, "models.example.json"), dest: join(targetAgent, "models.json"), label: "Models configuration" },
	{ src: join(templatesDir, "models.example.json"), dest: join(targetAgent, "models.example.json"), label: "Models example" },
	{ src: join(templatesDir, "settings.example.json"), dest: join(targetAgent, "settings.json"), label: "Settings configuration" },
	{ src: join(templatesDir, "settings.example.json"), dest: join(targetAgent, "settings.example.json"), label: "Settings example" },
	{ src: join(templatesDir, ".env.example"), dest: join(targetBase, ".env.example"), label: "Environment example" },
	{ src: join(templatesDir, "mcp.example.json"), dest: join(targetBase, "mcp.example.json"), label: "MCP example" },
];

for (const { src, dest, label } of filesToCopy) {
	if (!existsSync(src)) {
		console.warn(`Template not found: ${src}`);
		continue;
	}
	if (!existsSync(dest)) {
		copyFileSync(src, dest);
		console.log(`  Created ${label} at ${dest}`);
	} else {
		console.log(`  Skipped (already exists): ${dest}`);
	}
}

const envFile = join(targetBase, ".env");
if (!existsSync(envFile)) {
	const envExample = join(templatesDir, ".env.example");
	if (existsSync(envExample)) {
		copyFileSync(envExample, envFile);
		console.log(`  Created .env at ${envFile}`);
	}
} else {
	console.log(`  Skipped (already exists): ${envFile}`);
}

console.log("\nSetup complete! You can now edit ~/.cave/.env to add your API keys or run `caveman`.");
