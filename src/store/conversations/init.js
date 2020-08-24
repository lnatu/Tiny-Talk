/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {
  conversations: [],
  conversation: {}
};

const getters = {
  GET_CONVERSATIONS(state) {
    return state.conversations;
  },
  GET_ONE_CONVERSATION(state) {
    return state.conversation;
  }
};

const mutations = {
  PUSH_CONVERSATION(state, payload) {
    state.conversations.unshift(payload);
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
  FIND_CONVERSATION(state, { index }) {
    state.conversation = state.conversations[index];

    storageHelper.saveAsString(
      config.localKeys.CONVERSATION_KEY,
      state.conversation
    );
  },
  PUSH_NEW_MESSAGE_CONVERSATION(state, payload) {
    this._vm.$set(
      state.conversation.messages,
      state.conversation.messages.length,
      payload
    );

    storageHelper.saveAsString(
      config.localKeys.CONVERSATION_KEY,
      state.conversation
    );
  },
  SWAP_CONVERSATION_INDEX(state, payload) {
    const idx = state.conversations.findIndex(c => c._id === payload._id);
    const cTemp = state.conversations[0];

    if (idx === 0) {
      return;
    }

    state.conversations[0] = state.conversations[idx];
    state.conversations[idx] = cTemp;

    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  }
};

const actions = {
  async getMyConversations({ commit }) {
    try {
      const CONVERSATIONS_SIZE = Object.keys(state.conversations).length;
      const DATA_LIMIT = config.LIMITS.RESULTS_PER_CALL;
      const page = Math.ceil(CONVERSATIONS_SIZE / DATA_LIMIT) + 1;
      const sort = '-updatedAt';

      const res = await axios.get(config.api.conversations.getMyConversations, {
        params: {
          sort,
          page,
          limit: DATA_LIMIT
        }
      });
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
