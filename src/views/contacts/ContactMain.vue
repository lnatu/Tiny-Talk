<template>
  <div class="phonebook">
    <phone-book-sidebar />
  </div>
</template>

<script>
import PhoneBookSidebar from '@/components/phonebook/PBSidebar';

export default {
  name: 'ContactMain',
  components: {
    PhoneBookSidebar
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/phonebook/phonebook.scss';
</style>
