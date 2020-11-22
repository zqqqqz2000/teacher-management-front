import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'
import Antd from 'ant-design-vue';
import axios from 'axios'
import VueCookies from 'vue-cookies'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Antd);
Vue.use(VueCookies);
Vue.prototype.$axios = axios;

const router = new VueRouter({
  routes: routes.routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
