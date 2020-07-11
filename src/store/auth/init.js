const axios = require('axios');
const config = require('@/config');

const state = {
  local: {
    user: JSON.parse(localStorage.getItem(config.localKeys.USER_KEY)) || ''
  }
};

const getters = {
  GET_LOCAL_USER(state) {
    return state.local.user;
  },
  GET_LOGIN_STATUS(state) {
    return !!state.local.user;
  }
};

const mutations = {
  SET_LOCAL_USER(state, payload) {
    state.local.user = payload;
  }
};

const actions = {
  /* eslint-disable no-unused-vars */
  async login({ commit }, payload) {
    return await axios.post(config.api.auth.login, payload);
  },
  async logout() {
    return await axios.get(config.api.auth.logout);
  },
  async signUp({ commit }, payload) {
    return await axios.post(config.api.auth.signup, payload);
  },
  async activateAccount({ commit }, payload) {
    const activateApi = config.api.auth.activateAccount.replace(
      'token',
      payload
    );
    return await axios.get(activateApi);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
