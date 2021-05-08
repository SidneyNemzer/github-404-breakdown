const restrictedGlobals = require("confusing-browser-globals");

module.exports = {
  root: true,

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2017,
  },

  env: {
    es6: true,
  },

  plugins: ["import"],

  globals: {
    chrome: true,
  },

  // NOTE: When adding rules here, you need to make sure they are compatible with
  // `typescript-eslint`, as some rules such as `no-array-constructor` aren't compatible.
  rules: {
    "dot-location": ["warn", "property"],
    eqeqeq: ["warn", "smart"],
    "new-parens": "warn",
    "no-caller": "warn",
    "no-cond-assign": ["warn", "except-parens"],
    "no-const-assign": "warn",
    "no-control-regex": "warn",
    "no-delete-var": "warn",
    "no-dupe-args": "warn",
    "no-dupe-keys": "warn",
    "no-duplicate-case": "warn",
    "no-empty-character-class": "warn",
    "no-empty-pattern": "warn",
    "no-eval": "warn",
    "no-ex-assign": "warn",
    "no-extend-native": "warn",
    "no-extra-bind": "warn",
    "no-extra-label": "warn",
    "no-fallthrough": "warn",
    "no-func-assign": "warn",
    "no-implied-eval": "warn",
    "no-invalid-regexp": "warn",
    "no-iterator": "warn",
    "no-label-var": "warn",
    "no-labels": ["warn", { allowLoop: true, allowSwitch: false }],
    "no-lone-blocks": "warn",
    "no-loop-func": "warn",
    "no-mixed-operators": [
      "warn",
      {
        groups: [
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"],
        ],
        allowSamePrecedence: false,
      },
    ],
    "no-multi-str": "warn",
    "no-native-reassign": "warn",
    "no-negated-in-lhs": "warn",
    "no-new-func": "warn",
    "no-new-object": "warn",
    "no-new-symbol": "warn",
    "no-new-wrappers": "warn",
    "no-obj-calls": "warn",
    "no-octal": "warn",
    "no-octal-escape": "warn",
    "no-redeclare": "warn",
    "no-regex-spaces": "warn",
    "no-restricted-syntax": ["warn", "WithStatement"],
    "no-script-url": "warn",
    "no-self-assign": "warn",
    "no-self-compare": "warn",
    "no-sequences": "warn",
    "no-shadow-restricted-names": "warn",
    "no-sparse-arrays": "warn",
    "no-template-curly-in-string": "warn",
    "no-this-before-super": "warn",
    "no-throw-literal": "warn",
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    "no-unreachable": "warn",
    "no-unused-labels": "warn",
    "no-useless-computed-key": "warn",
    "no-useless-concat": "warn",
    "no-useless-escape": "warn",
    "no-useless-rename": [
      "warn",
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    "no-with": "warn",
    "no-whitespace-before-property": "warn",
    "require-yield": "warn",
    "rest-spread-spacing": ["warn", "never"],
    "unicode-bom": ["warn", "never"],
    "use-isnan": "warn",
    "valid-typeof": "warn",
    "no-restricted-properties": [
      "error",
      {
        object: "require",
        property: "ensure",
        message: "Please use import() instead",
      },
      {
        object: "System",
        property: "import",
        message: "Please use import() instead",
      },
    ],
    "getter-return": "warn",
    "no-debugger": "warn",

    // IMPORT

    "import/first": "error",
    "import/no-amd": "error",
    "import/no-webpack-loader-syntax": "error",
    "import/no-extraneous-dependencies": "warn",
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external"],
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
          },
        ],
        "newlines-between": "always",
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: { order: "asc" },
      },
    ],
  },
};
