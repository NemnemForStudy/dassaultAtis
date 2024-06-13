module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'airbnb-base',
    'plugin:vue/recommended',
    'plugin:vue-scoped-css/all',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    'vue-scoped-css/enforce-style-type': 0,
    'vue-scoped-css/require-v-deep-argument': 0
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
};
