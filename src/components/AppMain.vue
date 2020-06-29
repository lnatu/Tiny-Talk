<template>
  <main class="main">
    <chat-main />
  </main>
</template>

<script>
import ChatMain from '@/components/chat/ChatMain';

export default {
  name: 'AppMain',
  components: {
    ChatMain
  }
};
</script>

<style lang="scss" scoped>
main.main {
  display: flex;
  flex: 1;
}
</style>
