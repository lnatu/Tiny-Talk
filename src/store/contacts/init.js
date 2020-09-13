const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

/* eslint-disable */

const storageHelper = new helper.StorageHelper();

const state = {
  contacts: storageHelper.getAsJson(config.localKeys.USER_CONTACT_KEY) || [],
  contact:
    storageHelper.getAsJson(config.localKeys.USER_CONTACT_ID_KEY) || null,
  contactLoading: false
};

const getters = {
  GET_CONTACTS(state) {
    return state.contacts.sort(function(a, b) {
      if (a.contact.firstName < b.contact.firstName) {
        return -1;
      }

      if (a.contact.firstName > b.contact.firstName) {
        return 1;
      }

      return 0;
    });
  },
  GET_ONE_CONTACT(state) {
    return state.contact;
  },
  /**
   *
   * @param state
   * @returns {boolean}
   * @constructor
   */
  GET_CONTACT_LOADING(state) {
    return state.contactLoading;
  }
};

const mutations = {
  SET_CONTACTS(state, payload) {
    state.contacts = payload;
  },
  SET_ONE_CONTACT(state, payload) {
    state.contact = state.contacts.find(c => c._id === payload);
    storageHelper.saveAsString(
      config.localKeys.USER_CONTACT_ID_KEY,
      state.contact
    );
  },
  DEL_ONE_CONTACT(state) {
    state.contact = null;
    storageHelper.remove(config.localKeys.USER_CONTACT_ID_KEY);
  },
  SET_CONTACT_LOADING(state, payload) {
    state.contactLoading = payload;
  },
  ADD_TO_FIRST_CONTACTS(state, payload) {
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

    commit('SET_CONTACT_LOADING', true);

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
        commit('SET_CONTACT_LOADING', false);
        return;
      }

      commit('SET_CONTACTS', contacts);

      storageHelper.saveAsString(
        config.localKeys.USER_CONTACT_KEY,
        state.contacts
      );
      commit('SET_CONTACT_LOADING', false);
    } catch (err) {
      commit('SET_CONTACT_LOADING', false);
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
