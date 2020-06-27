<template>
  <div class="layout">
    <app-nav />
  </div>
</template>

<script>
import AppNav from '@/components/shared/AppNav';

export default {
  name: 'Home',
  components: {
    AppNav
  }
};
</script>

<style lang="scss">
.layout {
  height: 100%;
  background: red;
}
</style>
