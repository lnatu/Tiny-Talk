<template>
  <div class="phonebook">
    <phone-book-sidebar />
    <transition name="slide-right">
      <phone-book-detail v-if="true" />
    </transition>
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
