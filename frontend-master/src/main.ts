import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VeeValidate from 'vee-validate';
import {ApiService} from './services/ApiService';
import i18n from './lang/i18n';

Vue.use(VeeValidate, {
  fieldsBagName: 'vvFields',
});
Vue.use(VeeValidate);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
ApiService.init('/api');

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount('#app');


// y la em muon tao file conffig been kia luon
//à ok