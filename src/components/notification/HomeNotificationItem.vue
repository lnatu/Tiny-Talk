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
      <p class="notification-times mt-1">{{ createdAt }}</p>
      <div class="mt-sm" v-if="SPINNER_SHOW && SPINNER_SHOW[contactId]">
        <spinner />
      </div>
      <div v-else class="notification-cta">
        <div v-if="type === 'add-contact'">
          <button
            class="btn btn-submit"
            @click="acceptFriendRequest({ contact: contactId })"
          >
            Accept
          </button>
          <button
            class="btn btn-danger ml-1"
            @click="cancelAddContactAction({ contact: contactId })"
          >
            Cancel
          </button>
        </div>
        <div v-if="type === 'accept-contact'" class="text-accept">
          Friend request accepted
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Spinner from '@/components/loading/Spinner';
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
    },
    type: {
      type: String,
      required: true
    },
    createdAt: {
      type: String,
      required: true
    }
  },
  mixins: [mixin],
  components: {
    Spinner
  }
};
</script>
