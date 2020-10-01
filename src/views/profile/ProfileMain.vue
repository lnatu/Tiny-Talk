<template>
  <div class="profile-main layout w-100">
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

.profile-main {
  @include mobile {
    order: -1;
    height: 100%;

    background: $bg-light-color-2;
    overflow-y: auto;
  }
}
</style>
