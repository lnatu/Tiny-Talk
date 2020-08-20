const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

/* eslint-disable */

const storageHelper = new helper.StorageHelper();

const state = {
  contacts: storageHelper.getAsJson(config.localKeys.USER_CONTACT_KEY) || {}
};

const getters = {
  GET_CONTACTS(state) {
    return state.contacts;
  }
};

const mutations = {
  SET_CONTACTS(state, payload) {
    state.contacts = payload;
  },
  SET_CONTACT_KEY_VALUE(state, payload) {
    this._vm.$set(state.contacts, payload._id, payload);
  }
};

const actions = {
  async getMyContacts({ state, commit }) {
    try {
      const CONTACT_SIZE = Object.keys(state.contacts).length;
      const DATA_LIMIT = config.LIMITS.RESULTS_PER_CALL;
      const page = Math.ceil(CONTACT_SIZE / DATA_LIMIT) + 1;

      const res = await axios.get(config.api.contacts.getMyContacts, {
        params: {
          page,
          limit: config.LIMITS.RESULTS_PER_CALL
        }
      });

      const { contacts } = res.data.data;

      if (contacts.length === 0) {
        return;
      }

      contacts.forEach(contact => {
        commit('SET_CONTACT_KEY_VALUE', contact);
      });
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
