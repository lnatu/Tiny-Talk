/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async sendMessage({ commit }, { conversation, message }) {
    return await axios.post(config.api.messages.sendMessage, {
      conversation,
      message
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
