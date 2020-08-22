/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {
  conversations:
    storageHelper.getAsJson(config.localKeys.CONVERSATIONS_KEY) || [],
  conversation:
    storageHelper.getAsJson(config.localKeys.CONVERSATION_KEY) || {},
  contactId:
    storageHelper.getAsJson(config.localKeys.CONVERSATION_CONTACT_ID_KEY) ||
    null
};

const getters = {
  GET_CONVERSATIONS(state) {
    return state.conversations;
  },
  GET_ONE_CONVERSATION(state) {
    return state.conversation;
  },
  GET_CONTACT_ID(state) {
    return state.contactId;
  }
};

const mutations = {
  PUSH_CONVERSATION(state, payload) {
    state.conversations.push(payload);
    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  },
  SET_CONVERSATIONS(state, payload) {
    state.conversations = payload;
    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  },
  FIND_CONVERSATION(state, { userId }) {
    state.conversation = state.conversations.find(c =>
      c.participants.find(p => p._id === userId)
    );

    state.contactId = userId;

    storageHelper.saveAsString(
      config.localKeys.CONVERSATION_KEY,
      state.conversation
    );

    storageHelper.saveAsString(
      config.localKeys.CONVERSATION_CONTACT_ID_KEY,
      state.contactId
    );
  }
};

const actions = {
  async getMyConversations({ commit }, payload) {
    if (state.conversations.length > 0) {
      return;
    }

    try {
      const res = await axios.get(config.api.conversations.getMyConversations);
      const conversations = res.data.data.conversations;

      if (conversations.length === 0) {
        return;
      }

      commit('SET_CONVERSATIONS', conversations);
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
