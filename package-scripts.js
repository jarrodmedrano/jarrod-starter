const path = require('path')

const clientPath = path.resolve(__dirname, 'apps/client')
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
    lintStaged: {
      default: 'nps prettier.fix eslint.fix',
    },
    precommit: {
      default: 'nps build',
    },
    prebuild: {
      default: 'nps lintStaged',
    },
  },
}
