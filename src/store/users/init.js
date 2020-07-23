const axios = require('axios');
const config = require('@/config');

const state = {};

const getters = {};

const mutations = {};

const actions = {
  /* eslint-disable */
  async findAllUser({ commit }, { q }) {
    return await axios.get(config.api.users.findAll, {
      params: {
        search: q
      }
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
