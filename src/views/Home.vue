<template>
  <div class="layout">
    <app-nav />
    <app-sidebar />
  </div>
</template>

<script>
import AppNav from '@/components/shared/AppNav';
import AppSidebar from '@/components/shared/AppSidebar';

export default {
  name: 'Home',
  components: {
    AppNav,
    AppSidebar
  }
};
</script>

<style lang="scss">
.layout {
  height: 100%;
  display: flex;
}
</style>
