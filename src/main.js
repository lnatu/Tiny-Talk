import Vue from 'vue';
import { MediaQueries } from 'vue-media-queries';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuelidate from 'vuelidate';
import VueAlertify from 'vue-alertify';
import mixin from '@/mixins/global';

import '@/assets/js/app.js';

Vue.config.productionTip = false;

const mediaQueries = new MediaQueries();

Vue.mixin(mixin);
Vue.use(mediaQueries);
Vue.use(Vuelidate);
Vue.use(VueAlertify);

new Vue({
  router,
  store,
  mediaQueries: mediaQueries,
  render: h => h(App)
}).$mount('#app');
