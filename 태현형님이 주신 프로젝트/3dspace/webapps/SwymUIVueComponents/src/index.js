/* eslint-disable no-param-reassign */

import './styles/transitions.scss';
import './styles/global.scss';

const req = require.context('./components', true, /.vue$/);
const components = req.keys().map(req);

// eslint-disable-next-line no-unused-vars
const install = (Vue, i18n = {}) => {
  console.debug('i18n :>> ', i18n);
  components.forEach((el) => {
    console.debug('Installing :>> ', el.default.name);

    const $i18n = (key, opt = {}) => {
      let str = i18n[key] || `i18n_${key}`;

      Object.entries(opt).forEach(([k, value]) => {
        str = str.replace(`{${k}}`, value);
      });

      return str;
    };

    if (el.default.methods) {
      el.default.methods.$i18n = $i18n;
    } else {
      el.default.methods = { $i18n };
    }
    Vue.component(el.default.name, el.default);
  });
};

// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

export default install;
export { install };
