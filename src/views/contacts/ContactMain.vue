<template>
  <div class="phonebook">
    <phone-book-sidebar />
    <transition name="slide-right">
      <phone-book-detail v-if="GET_ONE_CONTACT" />
    </transition>
    <div class="phonebook-empty flex-1" v-if="!GET_ONE_CONTACT && !isMobile"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PhoneBookSidebar from '@/components/phonebook/PBSidebar';
import PhoneBookDetail from '@/components/phonebook/PBDetail';

export default {
  name: 'ContactMain',
  components: {
    PhoneBookDetail,
    PhoneBookSidebar
  },
  computed: {
    ...mapGetters(['GET_ONE_CONTACT'])
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/phonebook/phonebook.scss';
</style>
