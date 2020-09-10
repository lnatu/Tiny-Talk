<template>
  <div class="phonebook">
    <phone-book-sidebar />
    <phone-book-detail />
  </div>
</template>

<script>
import PhoneBookSidebar from '@/components/phonebook/PBSidebar';
import PhoneBookDetail from '@/components/phonebook/PBDetail';

export default {
  name: 'ContactMain',
  components: {
    PhoneBookDetail,
    PhoneBookSidebar
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/phonebook/phonebook.scss';
</style>
