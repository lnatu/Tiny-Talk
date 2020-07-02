<template>
  <section class="chats h-100">
    <conversation />
    <profile />
  </section>
</template>

<script>
import Conversation from '@/components/conversation/Conversation';
import Profile from '@/components/profile/Profile';

export default {
  name: 'ChatMain',
  components: {
    Conversation,
    Profile
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/_conversation';
@import '@/assets/scss/components/_message';
@import '@/assets/scss/components/_typing';
@import '@/assets/scss/components/_contact';
</style>
