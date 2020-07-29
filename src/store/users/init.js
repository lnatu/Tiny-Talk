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
  },
  async addContact({ commit }, { contactId }) {
    return await axios.post(config.api.users.addContact, {
      contactId
    });
  },
  async cancelAddContact({ commit }, { contactId }) {
    return await axios.delete(config.api.users.cancelAddContact, {
      contactId
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
