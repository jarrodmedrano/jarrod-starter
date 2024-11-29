const path = require('path')

const clientPath = path.resolve(__dirname, 'apps/next')
const apiPath = path.resolve(__dirname, 'apps/api')

module.exports = {
  scripts: {
    clean: {
      default: 'docker system prune',
    },
    network: {
      default: 'docker network create starter_app_network',
    },
    prepare: {
      default: 'nps prepare.install prepare.format',
      install: 'npx husky install && pnpm install',
      docker: 'docker compose up',
    },
    build: {
      default: 'npx turbo run build',
    },
    eslint: {
      default: 'eslint "**/*.+(js|jsx|ts|tsx)"',
      fix: 'eslint --fix "**/*.+(js|jsx|ts|tsx)"',
    },
    prettier: {
      default: 'prettier --check "**/*.+(js|jsx|ts|tsx|json|yml|yaml|md|css)"',
      fix: 'prettier --write "**/*.+(js|jsx|ts|tsx|json|yml|yaml|md|css)"',
    },
    lint: 'turbo run lint',
    dev: {
      default: 'docker compose -f docker-compose.dev.yml up --build',
    },
    prod: {
      default: 'docker compose -f docker-compose.yml up --build',
    },
    prepare: {
      default: 'nps prepare.install prepare.format',
      install: 'npx husky install && pnpm install',
      format: 'nps lintStaged',
      docker: 'docker compose up',
      ci: {
        web: `npx turbo prune --scope=next-app && cd out && pnpm install --frozen-lockfile`,
      },
    },
    preview: 'vite preview',
    coverage: 'vitest run --coverage',
    lintStaged: {
      default: 'nps prettier.fix eslint.fix',
    },
    precommit: {
      default: 'npx sort-package-json && nps prebuild && nps build',
    },
    prebuild: {
      default: 'nps prepare.format',
    },
    test: {
      default: 'nps test.client',
      client: `cd ${clientPath} && npx vitest --passWithNoTests`,
      api: `cd ${apiPath} && npx vitest --passWithNoTests`,
    },
    mobile: {
      default: 'cd apps/expo && pnpm start',
    },
  },
}
