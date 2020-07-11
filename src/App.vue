<template>
  <div id="app">
    <div class="layout">
      <app-nav v-if="GET_LOGIN_STATUS" />
      <router-view></router-view>
    </div>
    <loader v-if="SHOW_LOADER" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import AppNav from '@/components/shared/AppNav';
import Loader from '@/components/shared/Loader';

export default {
  name: 'AppHome',
  components: {
    AppNav,
    Loader
  },
  computed: {
    ...mapGetters(['SHOW_LOADER', 'GET_LOGIN_STATUS'])
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_ERROR_MESSAGE'])
  },
  created() {
    /* axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    }); */
    axios.interceptors.response.use(
      response => response,
      error => {
        this.SET_GLOBAL_ERROR_MESSAGE(error.response.data.message);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/init';
#app {
  height: 100vh;

  overflow-y: hidden;
}
</style>
