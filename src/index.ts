#!/usr/bin/env node
import * as p from "@clack/prompts";
import color from "picocolors";
import { setTimeout } from "node:timers/promises";
import { exec } from "child_process";

const path = require("path");
const fs = require("fs-extra");
const { execSync } = require("child_process");

const templateDir = path.join(__dirname, "../template_main");
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

  const copyMobile = async () => {
    const expoPaths = path.join(__dirname, `../templates/apps/expo`);
    const iosPaths = path.join(__dirname, `../templates/ios`);

    try {
      await fs.copy(expoPaths, targetDir + `/apps/expo`);
      await fs.copy(iosPaths, targetDir + `/ios`);
      console.log("Expo copied successfully!");
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
      mobile: () =>
        p.confirm({
          message: "Is this a mobile project?",
          initialValue: false,
        }),
      auth: ({ results }: { results: any }) =>
        p.select({
          message: `Pick an auth type within "${results.path}"`,
          initialValue: "nextauth",
          maxItems: 1,
          options: [
            { value: "nextauth", label: "Next Auth" },
            { value: "clerk", label: "Clerk" },
          ],
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

  await copyFiles();

  if (project.mobile) {
    await copyMobile();
  }

  if (project.database) {
    await copyDb(project.database);
  }
  const s = p.spinner();
  if (project.auth) {
    s.start("Adding Auth");

    execSync(
      `mv ${targetDir}/apps/next/middleware_${project.auth}.ts ${targetDir}/apps/next/middleware.ts`
    );
    execSync(
      `mv ${targetDir}/apps/next/app/layout_${project.auth}.tsx ${targetDir}/apps/next/app/layout.tsx`
    );
    execSync(
      `mv "${targetDir}/apps/next/app/(auth)/signin/[[...rest]]/page_${project.auth}.tsx" "${targetDir}/apps/next/app/(auth)/signin/[[...rest]]/page.tsx"`
    );
    execSync(
      `mv "${targetDir}/apps/next/app/(auth)/register/[[...rest]]/page_${project.auth}.tsx" "${targetDir}/apps/next/app/(auth)/register/[[...rest]]/page.tsx"`
    );
    // rename packages/ui/components/header/loginbutton/userbutton_${project.auth}.tsx to userbutton.tsx
    execSync(
      `mv "${targetDir}/packages/ui/components/header/loginbutton/userbutton_${project.auth}.tsx" "${targetDir}/packages/ui/components/header/loginbutton/userbutton.tsx"`
    );
    s.stop("Added Auth");
  }

  if (project.install) {
    exec("pnpm install", (error, stdout, stderr) => {
      const s = p.spinner();
      s.start("Installing via pnpm");

      if (error) {
        console.error(`Error executing pnpm install: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error output: ${stderr}`);
        return;
      }

      console.log(`Output: ${stdout}`);
      s.stop("Installed via pnpm");
    });
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
