const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

/* eslint-disable */

const storageHelper = new helper.StorageHelper();

const state = {
  contacts: storageHelper.getAsJson(config.localKeys.USER_CONTACT_KEY) || [],
  contact: {}
};

const getters = {
  GET_CONTACTS(state) {
    return state.contacts;
  },
  GET_ONE_CONTACT(state) {
    return state.contact;
  }
};

const mutations = {
  SET_CONTACTS(state, payload) {
    state.contacts = payload;
  },
  SET_ONE_CONTACT(state, payload) {
    state.contact = state.contacts[payload]
  },
  ADD_TO_FIRST_CONTACTS(state, payload) {
    console.log(state.contacts);
    state.contacts.unshift(payload);
    storageHelper.saveAsString(
      config.localKeys.USER_CONTACT_KEY,
      state.contacts
    );
  },
  SORT_CONTACTS(state) {
    if (state.contacts.length === 0) {
      return;
    }
    storageHelper.saveAsString(
      config.localKeys.USER_CONTACT_KEY,
      state.contacts
    );
  }
};

const actions = {
  async getMyContacts({ state, commit }) {
    if (state.contacts.length > 0) {
      return;
    }
    try {
      const CONTACT_SIZE = Object.keys(state.contacts).length;
      const DATA_LIMIT = config.LIMITS.RESULTS_PER_CALL;
      const page = Math.ceil(CONTACT_SIZE / DATA_LIMIT) + 1;
      const sort = '-updatedAt';

      const res = await axios.get(config.api.contacts.getMyContacts, {
        params: {
          sort,
          page,
          limit: config.LIMITS.RESULTS_PER_CALL
        }
      });

      const { contacts } = res.data.data;

      if (contacts.length === 0) {
        return;
      }

      commit('SET_CONTACTS', contacts);

      storageHelper.saveAsString(
        config.localKeys.USER_CONTACT_KEY,
        state.contacts
      );
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
