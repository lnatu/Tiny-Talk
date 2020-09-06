/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {
  conversations:
    storageHelper.getAsJson(config.localKeys.CONVERSATIONS_KEY) || [],
  conversationIndex:
    storageHelper.get(config.localKeys.CONVERSATION_INDEX) || null,
  conversationLoader: false,
  conversationMobile: false,
  showConvInfo: false
};

const getters = {
  GET_CONVERSATIONS(state) {
    return state.conversations;
  },
  GET_ONE_CONVERSATION(state) {
    return state.conversations[state.conversationIndex * 1];
  },
  /**
   *
   * @param state
   * @returns {boolean}
   * @constructor
   */
  GET_CONVERSATION_LOADER(state) {
    return state.conversationLoader;
  },
  /**
   *
   * @param state
   * @returns {boolean}
   * @constructor
   */
  GET_CONVERSATION_MOBILE(state) {
    return state.conversationMobile;
  },
  /**
   *
   * @param state
   * @returns {boolean}
   * @constructor
   */
  GET_SHOW_CONV_INFO(state) {
    return state.showConvInfo;
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
    state.conversationIndex = index;

    storageHelper.saveAsString(
      config.localKeys.CONVERSATION_INDEX,
      state.conversationIndex
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
      config.localKeys.CONVERSATION_INDEX,
      state.conversationIndex
    );

    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  },
  SWAP_CONVERSATION_INDEX(state, payload) {
    const idx = state.conversations.findIndex(
      c => c._id === payload.conversation._id
    );

    if (idx === 0) {
      return;
    }

    const c = state.conversations[idx];
    state.conversations.splice(idx, 1);
    state.conversations.unshift(c);

    if (payload.next) {
      state.conversationIndex = state.conversations.indexOf(c);
    } else {
      if (state.conversationIndex !== state.conversations.length - 1) {
        state.conversationIndex++;
      }
    }

    storageHelper.saveAsString(
      config.localKeys.CONVERSATIONS_KEY,
      state.conversations
    );
  },
  SHOW_CONVERSATION_LOADER(state, payload) {
    state.conversationLoader = payload;
  },
  SET_CONVERSATION_MOBILE(state, payload) {
    state.conversationMobile = payload;
  },
  SET_SHOW_CONV_INFO(state, payload) {
    state.showConvInfo = payload;
  }
};

const actions = {
  async getMyConversations({ state, commit }) {
    if (state.conversations.length > 0) {
      return;
    }
    commit('SHOW_CONVERSATION_LOADER', true);
    try {
      const CONVERSATIONS_SIZE = state.conversations.length;
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
  },
  async getConversationMessages({ getters, commit }) {
    commit('SET_MES_LOADER', true);
    try {
      const currentCon = getters.GET_ONE_CONVERSATION;
      const api = config.api.conversations.getConversationMessages.replace(
        '%id%',
        currentCon._id
      );
      const MESSAGES_SIZE = currentCon.messages.length;
      const DATA_LIMIT = config.LIMITS.RESULTS_20;
      const page = Math.ceil(MESSAGES_SIZE / DATA_LIMIT) + 1;
      const res = await axios.get(api, {
        params: {
          page,
          limit: DATA_LIMIT,
          skip: MESSAGES_SIZE
        }
      });
      const messages = res.data.data.messages;

      commit('SET_MES_LOADER', false);

      if (messages.length === 0) {
        return;
      }

      currentCon.messages = [...messages, ...currentCon.messages];
      storageHelper.saveAsString(
        config.localKeys.CONVERSATIONS_KEY,
        state.conversations
      );
    } catch (err) {
      console.log(err);
      console.log(err.response);
      commit('SET_MES_LOADER', false);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
