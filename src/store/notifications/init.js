/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {
  homeNotification:
    JSON.parse(localStorage.getItem(config.localKeys.NOTIFICATIONS_KEY)) || {},
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
    this._vm.$set(state.homeNotification, payload._id, payload);
    storageHelper.save(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
    );
    state.totalNotifications++;
  },
  REMOVE_HOME_NOTIFICATIONS(state, payload) {
    this._vm.$delete(state.homeNotification, payload._id);
    storageHelper.save(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
    );
    if (state.totalNotifications > 0) {
      state.totalNotifications--;
    }
  },
  SET_HOME_NOTIFICATIONS(state, payload) {
    state.homeNotification = payload;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
