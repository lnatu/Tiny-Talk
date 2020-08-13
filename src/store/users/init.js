const axios = require('axios');
const config = require('@/config');

const state = {
  users: {}
};

const getters = {
  GET_USERS(state) {
    return state.users;
  }
};

const mutations = {
  SET_USERS(state, payload) {
    state.users = payload;
  },
  UPDATE_USERS_KEY(state, { userId, key, value }) {
    if (Object.keys(state.users).length === 0) {
      return;
    }

    this._vm.$set(state.users[userId], key, value);
  }
};

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
      data: {
        contactId
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
