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

Vue.use(VeeValidate, {
  fieldsBagName: 'vvFields',
});

Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
ApiService.init('/api');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
