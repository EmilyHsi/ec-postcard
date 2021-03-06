// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';
import moment from 'moment';
Vue.use(require('vue-moment'));
moment.locale('zh_tw');

import App from './App';
import router from './router';
import store from './store';
import './bus';

import currencyFilter from './filters/currency';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.use(VueI18n);

Vue.component('Loading', Loading); //全域啟用它
Vue.filter('currency',currencyFilter);
axios.defaults.withCredentials = true;

const i18n = new VueI18n({
  locale: 'zhTW'
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW
  }
});

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store,
});

router.beforeEach((to, from, next) => {
  // console.log('to',to, 'from', from, 'next', next);
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    // const vm = this;
    axios.post(api).then((response) => {
      // console.log(response.data)
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login'
        })
      }
    });
  } else {
    next();
  }

});
