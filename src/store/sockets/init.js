/* eslint-disable */
const axios = require('axios');
const config = require('@/config');

const state = {};

const getters = {};

const mutations = {};

const actions = {
  'SOCKET_friend-request-on-response'({ commit }, server) {
    console.log(server.currentUser);
    commit('PUSH_HOME_NOTIFICATIONS', server.currentUser);
    this._vm.$alertify.success(
      `${server.currentUser.fullName} sent you a friend request`
    );
  },

  'SOCKET_friend-request-off-response'({ commit }, server) {
    commit('REMOVE_HOME_NOTIFICATIONS', server.currentUser);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
