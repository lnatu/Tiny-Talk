<template>
  <div class="layout">
    <app-nav />
    <app-sidebar />
    <app-main />
  </div>
</template>

<script>
import AppNav from '@/components/shared/AppNav';
import AppSidebar from '@/components/shared/AppSidebar';
import AppMain from '@/components/AppMain';

export default {
  name: 'Home',
  components: {
    AppNav,
    AppSidebar,
    AppMain
  }
};
</script>

<style lang="scss">
.layout {
  height: 100%;
  display: flex;
}
</style>
