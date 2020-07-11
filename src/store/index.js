import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth/init';

export default new Vuex.Store({
  state: {
    showLoader: false,
    globalError: {
      message: ''
    }
  },
  getters: {
    /**
     * @return {boolean}
     */
    SHOW_LOADER(state) {
      return state.showLoader;
    },
    /**
     * @return {string}
     */
    GET_GLOBAL_ERROR_MESSAGE(state) {
      return state.globalError.message;
    }
  },
  mutations: {
    toggleLoader(state, payload) {
      state.showLoader = payload;
    },
    SET_GLOBAL_ERROR_MESSAGE(state, payload) {
      state.globalError.message = payload;
    }
  },
  actions: {},
  modules: { auth }
});
