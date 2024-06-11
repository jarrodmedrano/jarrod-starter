#!/usr/bin/env node
import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";

const path = require("path");
const fs = require("fs-extra");
const { execSync } = require("child_process");

const templateDir = path.join(__dirname, "../template");
const targetDir = process.cwd();

async function main() {
  console.clear();

  await setTimeout(1000);

  p.intro(`${color.bgCyan(color.black(" create-app "))}`);

  const copyFiles = async () => {
    await fs
      .copy(templateDir, targetDir)
      .then(() => {
        console.log("Project created successfully.");
      })
      .catch((err: any) => {
        console.error("Error creating project:", err);
      });
  };

  const copyDb = async (app: string) => {
    const paths = path.join(__dirname, `../templates/apps/${app}`);

    try {
      await fs.copy(paths, targetDir + `/apps/database`);

      console.log("Database copied successfully!");
    } catch (err) {
      console.error("Error copying directory:", err);
    }
  };

  const project = await p.group(
    {
      path: () =>
        p.text({
          message: "Where should we create your project?",
          placeholder: "./sparkling-solid",
          validate: (value: any) => {
            if (!value) return "Please enter a path.";
            if (value[0] !== ".") return "Please enter a relative path.";
          },
        }),
      database: ({ results }: { results: any }) =>
        p.select({
          message: `Pick a database type within "${results.path}"`,
          initialValue: "psql",
          maxItems: 1,
          options: [
            { value: "psql", label: "Postgresql & Golang" },
            { value: "sqlite", label: "SQLite" },
            { value: "", label: "None" },
          ],
        }),
      install: () =>
        p.confirm({
          message: "Install dependencies?",
          initialValue: false,
        }),
    },
    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  if (project.install) {
    const s = p.spinner();
    s.start("Installing via pnpm");
    await setTimeout(2500);
    s.stop("Installed via pnpm");
  }

  await copyFiles();

  if (project.database) {
    await copyDb(project.database);
  }

  let nextSteps = `cd ${project.path}        \n${
    project.install ? "" : "pnpm install\n"
  }pnpm dev`;

  p.note(nextSteps, "Next steps.");

  p.outro(
    `Done! Don't forget to set your environment vars! Problems? ${color.underline(
      color.cyan("https://github.com/jarrodmedrano/jarrod-starter/issues")
    )}`
  );
}

main().catch(console.error);
