<template>
  <section id="notificationModal" class="modal d-flex align-items-center">
    <div class="modal-dialog line-height-1">
      <div class="modal-content">
        <div
          class="modal-header d-flex align-items-center justify-content-between"
        >
          <h3 class="modal-header-title">Notifications</h3>
          <svg
            class="modal-close icon-svg icon-svg--2x icon-svg--dark cursor-pointer"
            data-close="notificationModal"
          >
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-x"></use>
          </svg>
        </div>
        <div class="modal-body" @scroll="scrollToLoad">
          <home-notification-list />
          <spinner />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HomeNotificationList from '@/components/notification/HomeNotificationList';
import Spinner from '@/components/loading/Spinner';
import mixin from '@/mixins/global';

export default {
  name: 'NotificationModal',
  components: {
    HomeNotificationList,
    Spinner
  },
  mixins: [mixin]
};
</script>
