module.exports = {
  extends: 'next',
  settings: {
    next: {
      rootDir: 'apps/next/',
    },
  },
  root: true,
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/no-default-export': ['warn'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unstable-nested-components': ['error'],
    'no-console': 'error',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: ['*/**/dist/*'],
}
