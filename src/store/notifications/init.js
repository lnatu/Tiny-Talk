const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {
  homeNotification:
    storageHelper.getAsJson(config.localKeys.NOTIFICATIONS_KEY) || {}
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
    let count = 0;
    for (const key in state.homeNotification) {
      if (!state.homeNotification[key].isRead) {
        count += 1;
      }
    }
    return count;
  }
};

const mutations = {
  PUSH_HOME_NOTIFICATIONS(state, payload) {
    this._vm.$set(state.homeNotification, payload._id, payload);
    storageHelper.saveAsString(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
    );
  },
  UPDATE_HOME_NOTIFICATION(state, { _id, value }) {
    if (Object.keys(state.homeNotification).length === 0) {
      return;
    }

    this._vm.$set(state.homeNotification, _id, value);
    storageHelper.saveAsString(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
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
  },
  SET_HOME_NOTIFICATIONS(state, payload) {
    state.homeNotification = payload;
  },
  MERGE_NEW_NOTIFICATIONS(state, payload) {
    state.homeNotification = { ...state.homeNotification, ...payload };
    storageHelper.saveAsString(
      config.localKeys.NOTIFICATIONS_KEY,
      state.homeNotification
    );
  }
};

const actions = {
  /* eslint-disable no-unused-vars */
  async getMyNotifications({ commit }, { page }) {
    return await axios.get(config.api.users.getNotifications, {
      params: {
        page,
        limit: config.LIMITS.RESULTS_PER_CALL
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
