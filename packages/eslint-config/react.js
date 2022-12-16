module.exports = {
  env: {
    'browser': true,
    'es6': true,
    'node': true
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier'
  ],
  rules: {
    'semi': ['warn', 'always'],
    'quotes': ['warn', 'single'],
    'array-bracket-spacing': 'error',
    'arrow-spacing': 'error',
    'complexity': 'off',
    'curly': 'off',
    'no-buffer-constructor': 'error',
    'no-var': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off'
  }
};
