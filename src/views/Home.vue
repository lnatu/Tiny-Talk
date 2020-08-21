<template>
  <div class="d-flex flex-1">
    <app-sidebar />
    <app-main />
    <notification-modal />
  </div>
</template>

<script>
import AppSidebar from '@/components/shared/AppSidebar';
import AppMain from '@/components/AppMain';
import NotificationModal from '@/components/modal/NotificationModal';
import { connect } from '@/mixins/socket-init';

export default {
  name: 'Home',
  components: {
    AppSidebar,
    AppMain,
    NotificationModal
  },
  created() {
    /* eslint-disable */
    connect();
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/init';
</style>
