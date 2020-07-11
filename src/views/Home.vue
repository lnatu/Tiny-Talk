<template>
  <div class="d-flex">
    <app-sidebar />
    <app-main />
  </div>
</template>

<script>
import AppSidebar from '@/components/shared/AppSidebar';
import AppMain from '@/components/AppMain';

export default {
  name: 'Home',
  components: {
    AppSidebar,
    AppMain
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/init';
</style>
