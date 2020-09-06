<template>
  <div class="contact-header">
    <h5>Profile Details</h5>
    <svg class="icon-svg--2x cursor-pointer" @click="SET_SHOW_CONV_INFO(false)">
      <use xlink:href="@/assets/img/icons/sprites.svg#icon-close" />
    </svg>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'ProfileHeader',
  methods: {
    ...mapMutations(['SET_SHOW_CONV_INFO'])
  }
};
</script>
