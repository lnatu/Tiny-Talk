/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async sendMessage({ getters, commit }, payload) {
    return await axios.post(config.api.messages.sendMessage, {
      conversation: payload.conversation,
      message: payload.message
    });
    // const _thisConversation = getters.GET_ONE_CONVERSATION;
    // const _thisUser = getters.GET_LOCAL_USER;
    // const contact = _thisConversation.participants.find(
    //   p => p._id !== _thisUser._id
    // );
    //
    // commit('SWAP_CONVERSATION_INDEX', _thisConversation);
    //
    // try {
    //   const res = await axios.post(config.api.messages.sendMessage, {
    //     conversation: payload.conversation,
    //     message: payload.message
    //   });
    //
    //   const { conversation, message } = res.data.data;
    //
    //   commit('PUSH_NEW_MESSAGE_CONVERSATION', message);
    //
    //   this._vm.$socket.emit('send-message', {
    //     contactId: contact._id,
    //     conversation,
    //     message
    //   });
    // } catch (err) {
    //   console.log(err);
    //   console.log(err.response);
    // }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
