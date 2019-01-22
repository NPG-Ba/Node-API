import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ER404 from './views/ErrorPage/404.vue';
import ER500 from './views/ErrorPage/500.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'list-person',
      component: Home,
    },
    {
      path: '/server-error',
      name: 'server-error',
      // serve error
      component:ER500,
    },
    {
      path: '/server-not-found',
      name: 'server-not-found',
      // serve not found
      component: ER404,
    }
  ],
});
