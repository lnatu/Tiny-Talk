import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth/init';

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth }
});
