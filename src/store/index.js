import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth/init';

export default new Vuex.Store({
  state: {
    showLoader: false
  },
  getters: {
    /**
     * @return {boolean}
     */
    SHOW_LOADER(state) {
      return state.showLoader;
    }
  },
  mutations: {
    toggleLoader(state, payload) {
      state.showLoader = payload;
    }
  },
  actions: {},
  modules: { auth }
});
