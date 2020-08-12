const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {
  homeNotification:
    JSON.parse(localStorage.getItem(config.localKeys.NOTIFICATIONS_KEY)) || {},
  totalNotifications:
    parseInt(localStorage.getItem(config.localKeys.TOTAL_NOTIFICATIONS_KEY)) ||
    0
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
    storageHelper.saveAsString(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
    );
    state.totalNotifications++;
    storageHelper.save(
      config.localKeys.TOTAL_NOTIFICATIONS_KEY,
      state.totalNotifications
    );
  },
  REMOVE_HOME_NOTIFICATIONS(state, payload) {
    if (!payload._id) {
      return;
    }
    this._vm.$delete(state.homeNotification, payload._id);
    storageHelper.saveAsString(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
    );
    if (state.totalNotifications > 0) {
      state.totalNotifications--;
      storageHelper.save(
        config.localKeys.TOTAL_NOTIFICATIONS_KEY,
        state.totalNotifications
      );
    }
  },
  SET_HOME_NOTIFICATIONS(state, payload) {
    state.homeNotification = payload;
  },
  SET_HOME_TOTAL_NOTIFICATIONS(state, payload) {
    state.totalNotifications = payload;
  },
  DECREASE_HOME_TOTAL_NOTIFICATIONS(state) {
    state.totalNotifications -= 1;
    storageHelper.save(
      config.localKeys.TOTAL_NOTIFICATIONS_KEY,
      state.totalNotifications
    );
  },
  INCREASE_HOME_TOTAL_NOTIFICATIONS(state) {
    state.totalNotifications += 1;
    storageHelper.save(
      config.localKeys.TOTAL_NOTIFICATIONS_KEY,
      state.totalNotifications
    );
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
