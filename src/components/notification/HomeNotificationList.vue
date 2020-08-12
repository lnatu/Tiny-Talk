<template>
  <div>
    <div v-if="Object.keys(GET_HOME_NOTIFICATIONS).length === 0">
      <h4>Nothing here... 😭😭😭</h4>
    </div>
    <ul v-else class="notification-list list-style-none">
      <home-notification-item
        v-for="item in GET_HOME_NOTIFICATIONS"
        :key="item._id"
        :id="item._id"
        :contactId="item.sender._id"
        :avatar="item.sender.avatar"
        :fullName="item.sender.fullName"
      />
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HomeNotificationItem from './HomeNotificationItem';

export default {
  name: 'MainNotificationList',
  components: {
    HomeNotificationItem
  },
  computed: {
    ...mapGetters(['GET_HOME_NOTIFICATIONS'])
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/abstract/_variables';

.notification {
  &-item + &-item {
    margin-top: 40px;
  }

  &-picture {
    img {
      object-fit: cover;

      display: block;
    }

    &__avatar {
      border-radius: 50%;
      width: 80px;
      height: 80px;
    }

    &__icon {
      width: 25px;
      height: 25px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      background-image: linear-gradient(
        to right bottom,
        #908af7,
        #867ff9,
        #7c74fb,
        #7169fd,
        #665dfe
      );

      position: absolute;
      bottom: -3px;
      right: 0;
    }
  }

  &-content {
    margin-top: 5px;
  }

  &-text {
    font-weight: 300;
    color: $light-color-3;

    span {
      font-size: 1.7rem;
      color: $text-color;
      font-weight: 700;
    }
  }

  &-times {
    font-size: 1.1rem;
    color: $light-color;
  }

  &-cta {
    margin-top: 5px;
  }
}
</style>
