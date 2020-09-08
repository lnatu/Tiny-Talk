<template>
  <transition name="slide-right">
    <main class="main" v-if="GET_CONVERSATION_MOBILE">
      <chat-main />
    </main>
  </transition>
</template>

<script>
/* eslint-disable */
import ChatMain from '@/components/chat/ChatMain';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AppMain',
  components: {
    ChatMain
  },
  computed: {
    ...mapGetters(['GET_CONVERSATION_MOBILE'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/abstract/_variables.scss';
@import '@/assets/scss/mixins/_mobile.scss';

main.main {
  display: flex;
  flex: 1;

  @include mobile {
    background: $white-color;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 1100;

    width: 100%;
    height: 100%;
  }
}
</style>
