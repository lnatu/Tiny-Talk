<template>
  <div id="app">
    <div class="layout">
      <app-nav v-if="GET_LOGIN_STATUS" />
      <router-view />
    </div>
    <loader v-if="SHOW_LOADER" />
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import AppNav from '@/components/shared/AppNav';
import Loader from '@/components/shared/Loader';
import mixin from '@/mixins/global';

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
    ...mapMutations(['toggleLoader', 'SET_GLOBAL_ERROR_MESSAGE'])
  },
  mixins: [mixin],
  created() {
    axios.interceptors.response.use(
      response => response,
      error => {
        this.toggleLoader(false);
        this.SET_GLOBAL_ERROR_MESSAGE(error.response.data.message);
        throw error;
      }
    );
  },
  mounted() {
    const setFullHeight = () => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.getElementById('app').style.setProperty('--vh', `${vh}px`);
    };

    setFullHeight();
    window.addEventListener('resize', () => {
      setFullHeight();
    });
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/init';
#app {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);

  overflow-y: hidden;

  .layout {
    @include mobile {
      flex-direction: column;
    }
  }
}
</style>
