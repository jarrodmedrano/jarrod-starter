module.exports = {
  scripts: {
    prepare: {
      default: "nps prepare.install prepare.format",
      install: "pnpm husky install && pnpm install",
    },
    build: {
      default: "pnpm run build",
    },
    prepare: {
      default: "nps prepare.install prepare.format",
      install: "npx husky install && pnpm install",
      format: "nps lintStaged",
    },
    precommit: {
      default: "npx sort-package-json && nps prebuild && nps build",
    },
    prebuild: {
      default: "nps prepare.format",
    },
  },
};
