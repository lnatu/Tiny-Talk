<template>
  <div class="contact h-100">
    <profile-header />
    <profile-body />
  </div>
</template>

<script>
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileBody from '@/components/profile/ProfileBody';

export default {
  name: 'Profile',
  components: {
    ProfileHeader,
    ProfileBody
  }
};
</script>

<style scoped></style>
