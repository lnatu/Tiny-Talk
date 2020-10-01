/* eslint-disable */
const axios = require('axios');
const config = require('@/config');
const helper = require('../helper');

const storageHelper = new helper.StorageHelper();

const state = {};

const getters = {};

const mutations = {};

const actions = {
  async sendMessage({ commit }, payload) {
    return await axios.post(config.api.messages.sendMessage, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
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
