/* eslint-disable */
const axios = require('axios');
const config = require('@/config');

const state = {};

const getters = {};

const mutations = {};

const actions = {
  'SOCKET_friend-request-on-response'({ commit }, server) {
    commit('PUSH_HOME_NOTIFICATIONS', server.notification);
    commit('UPDATE_USERS_KEY', {
      userId: server.currentUser,
      key: 'friendRequest',
      value: { accept: true }
    });
    this._vm.$alertify.success(
      `${server.notification.sender.fullName} sent you a friend request`
    );
  },

  'SOCKET_friend-request-off-response'({ commit }, server) {
    commit('REMOVE_HOME_NOTIFICATIONS', { _id: server.notificationId });
    commit('DELETE_USERS_KEY', {
      userId: server.currentUser,
      key: 'friendRequest'
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};