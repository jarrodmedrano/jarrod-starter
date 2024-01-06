const path = require('path')

const clientPath = path.resolve(__dirname, 'apps/next')
const apiPath = path.resolve(__dirname, 'apps/api')

const ciApiPath = path.resolve(__dirname, 'out/apps/api')
const ciWebPath = path.resolve(__dirname, 'out/apps/web')

module.exports = {
  scripts: {
    prepare: {
      default: 'nps prepare.install prepare.format',
      install: 'npx husky install && pnpm install',
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
    prepare: {
      default: 'nps prepare.install prepare.format',
      install: 'npx husky install && pnpm install',
      format: 'prettier --write "**/*.{ts,tsx,md}',
      docker: 'docker compose up',
      ci: {
        web: `npx turbo prune --scope=next && cd out && pnpm install --frozen-lockfile`,
      },
    },
    preview: 'vite preview',
    coverage: 'vitest run --coverage',
    lintStaged: {
      default: 'nps prettier.fix eslint.fix',
    },
    precommit: {
      default: 'nps build',
    },
    prebuild: {
      default: 'nps prepare.format',
    },
    test: {
      default: 'nps test.client',
      client: `cd ${clientPath} && npx vitest`,
      api: `cd ${apiPath} && npx vitest`,
    },
  },
}
