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
        <div
          class="modal-body hide-scrollbar"
          ref="notiScroll"
          @scroll="scrollToLoad($event, loadMoreNotifications)"
        >
          <home-notification-list />
          <spinner v-if="showSpinner" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import HomeNotificationList from '@/components/notification/HomeNotificationList';
import Spinner from '@/components/loading/Spinner';
import config from '@/config';
import mixin from '@/mixins/global';

export default {
  name: 'NotificationModal',
  components: {
    HomeNotificationList,
    Spinner
  },
  computed: {
    ...mapGetters(['GET_HOME_NOTIFICATIONS'])
  },
  mixins: [mixin],
  methods: {
    ...mapMutations(['MERGE_NEW_NOTIFICATIONS']),
    ...mapActions(['getMyNotifications']),
    async loadMoreNotifications() {
      try {
        const notificationSize = Object.keys(this.GET_HOME_NOTIFICATIONS)
          .length;
        const limitedResults = config.LIMITS.RESULTS_PER_CALL;
        const page = Math.ceil(notificationSize / limitedResults) + 1;
        const res = await this.getMyNotifications({ page });
        const notifications = res.data.data.notifications;
        if (notifications.length > 0) {
          let notificationObj = {};
          notifications.forEach(item => (notificationObj[item._id] = item));
          this.MERGE_NEW_NOTIFICATIONS(notificationObj);
        }
        this.showSpinner = false;
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    }
  }
};
</script>
