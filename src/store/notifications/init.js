/* eslint-disable */
const axios = require('axios');
const config = require('@/config');

const state = {
  homeNotification: {},
  totalNotifications: 0
};

const getters = {
  /**
   *
   * @param state
   * @returns {{totals: number}}
   * @constructor
   */
  GET_HOME_NOTIFICATIONS(state) {
    return state.homeNotification;
  },
  /**
   *
   * @param state
   * @returns {number}
   * @constructor
   */
  GET_TOTAL_NOTIFICATIONS(state) {
    return state.totalNotifications;
  }
};

const mutations = {
  PUSH_HOME_NOTIFICATIONS(state, payload) {
    this._vm.$set(state.homeNotification, payload.id, payload);
    state.totalNotifications++;
  },
  REMOVE_HOME_NOTIFICATIONS(state, payload) {
    this._vm.$delete(state.homeNotification, payload.id);
    if (state.totalNotifications > 0) {
      state.totalNotifications--;
    }
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
