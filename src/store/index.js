import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import auth from './auth/init';
import contacts from './contacts/init';
import conversations from './conversations/init';
import messages from './messages/init';
import users from './users/init';
import notifications from './notifications/init';
import sockets from './sockets/init';

export default new Vuex.Store({
  state: {
    showLoader: false,
    showSaveImage: false,
    globalError: {
      message: ''
    },
    showTyping: {
      isOn: false,
      conversationId: null
    },
    messageLoader: false
  },
  getters: {
    /**
     * @return {boolean}
     */
    SHOW_LOADER(state) {
      return state.showLoader;
    },
    /**
     *
     * @param state
     * @returns {boolean}
     * @constructor
     */
    GET_SHOW_SAVE_IMAGE(state) {
      return state.showSaveImage;
    },
    /**
     * @return {string}
     */
    GET_GLOBAL_ERROR_MESSAGE(state) {
      return state.globalError.message;
    },
    /**
     *
     * @param state
     * @returns {boolean}
     * @constructor
     */
    GET_SHOW_TYPING(state) {
      return state.showTyping;
    },
    /**
     *
     * @param state
     * @returns {boolean}
     * @constructor
     */
    GET_MES_LOADER(state) {
      return state.messageLoader;
    }
  },
  mutations: {
    toggleLoader(state, payload) {
      state.showLoader = payload;
    },
    SET_GLOBAL_ERROR_MESSAGE(state, payload) {
      state.globalError.message = payload;
    },
    SET_SHOW_SAVE_IMAGE(state, payload) {
      state.showSaveImage = payload;
    },
    SHOW_TYPING(state, payload) {
      state.showTyping.isOn = payload.isShow;
      state.showTyping.conversationId = payload.server.conversationId;
    },
    SET_MES_LOADER(state, payload) {
      state.messageLoader = payload;
    }
  },
  actions: {},
  modules: {
    auth,
    contacts,
    conversations,
    messages,
    users,
    notifications,
    sockets
  }
});
