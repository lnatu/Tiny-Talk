import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

require('@/assets/js/app');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
