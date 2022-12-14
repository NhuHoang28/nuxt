module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    '@nuxtjs',
  ],
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: '9',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  rules: {
    'linebreak-style': ['error', 'unix'],
    // allow-dangle (syncs w/ laravel).
    'comma-dangle': ['error', 'always-multiline'],

    // for sanity - allow people to write console.log - DO NOT CHECK IN
    'no-console': 'off',
    'no-debugger': 'off',
    // TODO: fix rule
    'no-undef': 'off',

    // do not require default for properties
    'vue/require-default-prop': 'off',

    // lets allow content on the same line for short html
    'vue/singleline-html-element-content-newline': 0,

    // under discussion
    camelcase: 'off',

    // Allows for lexical declarations within case/default clauses.
    'no-case-declarations': 'off',

    // this restrictions functions and classes to be defined before they are used
    // this is impossible to have on with model-typer
    'no-use-before-define': 'off',

    // note you must disable the base rule as it can report incorrect errors
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],

    // https://eslint.vuejs.org/rules/no-v-html.html
    'vue/no-v-html': 'off',
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: false,
    }],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 3,
      },
      multiline: {
        max: 3,
      },
    }],
    // Turn this off until we can figure out how to ignore pages/ and layouts/
    'vue/multi-word-component-names': 'off',
    // error  'nuxt' should be listed in the project's dependencies, not devDependencies
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],

    semi: ['error', 'always'],

    'object-curly-spacing': ['error', 'never'],
  },
};
