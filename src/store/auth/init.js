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
  /**
   * @return {boolean}
   */
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
  },
  async updateAvatar({ commit }, payload) {
    commit('toggleLoader', true);
    commit('SET_SHOW_SAVE_IMAGE', false);
    try {
      const res = await axios.patch(config.api.auth.updateAvatar, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setTimeout(function() {
        commit('SET_LOCAL_USER', res.data.data.user);
        localStorage.setItem(
          config.localKeys.USER_KEY,
          JSON.stringify(res.data.data.user)
        );
        commit('toggleLoader', false);
      }, 2000);
    } catch (err) {
      console.log(err);
      commit('toggleLoader', false);
    }
  },
  async updateAccountInfo({ commit }, payload) {
    return await axios.patch(config.api.auth.updateAccountInfo, payload);
  },
  async updatePassword({ commit }, payload) {
    return await axios.patch(config.api.auth.updatePassword, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
