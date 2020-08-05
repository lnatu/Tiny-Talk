import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from '../store';

export const connect = () => {
  Vue.use(
    new VueSocketIO({
      debug: true,
      connection: 'http://localhost:8001/',
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  );
};
