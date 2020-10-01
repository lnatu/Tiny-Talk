<template>
  <transition :name="isMobile ? 'slide-right' : 'flex-shrink'">
    <div class="contact h-100" v-if="GET_SHOW_CONV_INFO">
      <profile-header />
      <profile-body />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileBody from '@/components/profile/ProfileBody';

export default {
  name: 'Profile',
  components: {
    ProfileHeader,
    ProfileBody
  },
  computed: {
    ...mapGetters(['GET_SHOW_CONV_INFO'])
  }
};
</script>

<style scoped></style>
