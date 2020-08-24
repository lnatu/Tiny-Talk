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
  conversationLoader: false
};

const getters = {
  GET_CONVERSATIONS(state) {
    return state.conversations;
  },
  GET_ONE_CONVERSATION(state) {
    return state.conversation;
  },
  /**
   *
   * @param state
   * @returns {boolean}
   * @constructor
   */
  GET_CONVERSATION_LOADER(state) {
    return state.conversationLoader;
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
    const conv = state.conversations.find(
      c => c._id === payload.conversation._id
    );

    const idx = state.conversations.findIndex(
      c => c._id === payload.conversation._id
    );

    this._vm.$set(conv.messages, conv.messages.length, payload.message);
    this._vm.$set(state.conversations, idx, conv);

    storageHelper.saveAsString(
      config.localKeys.CONVERSATION_KEY,
      state.conversation
    );

    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  },
  SWAP_CONVERSATION_INDEX(state, payload) {
    const idx = state.conversations.findIndex(c => c._id === payload._id);

    if (idx === 0) {
      return;
    }

    const c = state.conversations[idx];
    state.conversations.splice(idx, 1);
    state.conversations.unshift(c);

    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  },
  SHOW_CONVERSATION_LOADER(state, payload) {
    state.conversationLoader = payload;
  }
};

const actions = {
  async getMyConversations({ state, commit }) {
    if (state.conversations.length > 0) {
      return;
    }
    commit('SHOW_CONVERSATION_LOADER', true);
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

      commit('SET_CONVERSATIONS', conversations);
      commit('SHOW_CONVERSATION_LOADER', false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      commit('SHOW_CONVERSATION_LOADER', false);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
