module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "airbnb/hooks",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/react",
        "prettier/@typescript-eslint",
        "stylelint-config-standard",
        "stylelint-config-rational-order",
        "stylelint-config-prettier"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "settings": {
      "import/resolver": {
        node: {
          extensions: ['.tsx', '.ts', '.js', '.json']
        },
        typescript: {
          directory: [resolve('./src/tsconfig.json'), resolve('./scripts/tsconfig.json')]
        }
      }
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "unicorn",
        "promise"
    ],
    "rules": {
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'error',
      'import/extensions': [
        ERROR,
        'ignorePackages',
        {
            ts: 'never',
            tsx: 'never',
            json: 'never',
            js: 'never',
        },
      ],
    }
};