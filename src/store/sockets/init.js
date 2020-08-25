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
      value: { wait: true }
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
  },

  'SOCKET_friend-request-accepted-response'({ commit }, server) {
    commit('UPDATE_USERS_KEY', {
      userId: server.currentUser,
      key: 'friendRequest',
      value: { accept: true }
    });
    commit('ADD_TO_FIRST_CONTACTS', server.contact);
    commit('PUSH_CONVERSATION', server.conversation);
  },

  'SOCKET_send-message-response-response'({ commit }, server) {
    commit('SWAP_CONVERSATION_INDEX', {
      conversation: server.conversation,
      next: false
    });
    commit('PUSH_NEW_MESSAGE_CONVERSATION', server);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
