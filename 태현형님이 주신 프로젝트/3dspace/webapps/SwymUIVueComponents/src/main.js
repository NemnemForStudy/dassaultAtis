import Vue from 'vue';
import App from './App.vue';
import { install } from './index';
import './styles/transitions.scss';
import i18n from '../assets/nls/i18n_en.json';

Vue.config.productionTip = false;
window['vu-kit'].install(Vue, i18n);
install(Vue, i18n);

const req = require.context('./playground', true, /.vue$/);
const components = req.keys().map(req);
window.components = components.map((el) => el.default.name);

components.forEach((el) => {
  console.debug('Playground - Installing :>> ', el.default.name);
  Vue.component(el.default.name, el.default);
});
new Vue({
  render(h) {
    return h(App);
  },
}).$mount('#app');
