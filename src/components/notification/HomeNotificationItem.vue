<template>
  <li class="notification-item d-flex">
    <figure class="notification-figure">
      <div class="notification-picture position-relative">
        <img
          class="notification-picture__avatar"
          :src="require(`@/assets/img/users/${avatar}`)"
          alt="girl"
        />
        <div class="notification-picture__icon">
          <svg class="icon-svg icon-svg--1x icon-svg--white">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-user"></use>
          </svg>
        </div>
      </div>
    </figure>
    <div class="notification-content pl-2">
      <p class="notification-text">
        <span>{{ fullName }}</span> has sent you a friend request
      </p>
      <p class="notification-times mt-1">a day ago</p>
      <div class="notification-cta">
        <button class="btn btn-submit">Accept</button>
        <button
          class="btn btn-danger ml-1"
          @click="cancelAddContactAction({ contactId })"
        >
          Cancel
        </button>
      </div>
    </div>
  </li>
</template>

<script>
import mixin from '@/mixins/global';

export default {
  name: 'HomeNotificationItem',
  props: {
    contactId: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    }
  },
  mixins: [mixin]
};
</script>
