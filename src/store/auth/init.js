const axios = require('axios');
const config = require('@/config');

const state = {
  isLoggedIn: false
};

const actions = {
  /* eslint-disable no-unused-vars */
  async signUp({ commit }, payload) {
    return await axios.post(config.api.auth.signup, payload);
  }
};

export default {
  state,
  actions
};
