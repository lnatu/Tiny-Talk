/* eslint-disable */
const axios = require('axios');
const config = require('@/config');

const state = {
  homeNotification: {}
};

const getters = {
  GET_HOME_NOTIFICATIONS(state) {
    return state.homeNotification;
  }
};

const mutations = {
  PUSH_HOME_NOTIFICATIONS(state, payload) {
    this._vm.$set(state.homeNotification, payload.id, payload);
  },
  REMOVE_HOME_NOTIFICATIONS(state, payload) {
    this._vm.$delete(state.homeNotification, payload.id);
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
