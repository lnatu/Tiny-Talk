const axios = require('axios');
const config = require('@/config');

const state = {
  isLoggedIn: false
};

const actions = {
  /* eslint-disable no-unused-vars */
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
  actions
};
