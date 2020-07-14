<template>
  <div class="layout w-100">
    <profile-side />
    <profile-setting />
  </div>
</template>

<script>
import ProfileSide from './ProfileSide';
import ProfileSetting from '@/components/profile/ProfileSetting';

export default {
  name: 'ProfileMain',
  components: {
    ProfileSide,
    ProfileSetting
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/init';
</style>
