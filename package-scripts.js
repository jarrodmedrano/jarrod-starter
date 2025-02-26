module.exports = {
  scripts: {
    eslint: {
      default: 'eslint "src/*.+(js|jsx|ts|tsx)"',
      fix: 'eslint --fix "src/*.+(js|jsx|ts|tsx)"',
    },
    build: {
      default: 'pnpm run build',
    },
    lintStaged: {
      default: 'nps prettier.fix eslint.fix',
    },
    prettier: {
      default: 'prettier --check "src/*.+(js|jsx|ts|tsx|json|yml|yaml|md|css)"',
      fix: 'prettier --write "src/*.+(js|jsx|ts|tsx|json|yml|yaml|md|css)"',
    },
    prepare: {
      default: 'nps prepare.install prepare.format',
      install: 'npx husky install && pnpm install',
      format: 'nps lintStaged',
    },
    precommit: {
      default: 'npx sort-package-json',
    },
    prebuild: {
      default: 'nps prepare.format',
    },
  },
}
