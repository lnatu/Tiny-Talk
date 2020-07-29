<template>
  <section class="user-search-content hide-scrollbar">
    <search-result />
  </section>
</template>

<script>
import SearchResult from '@/components/users/SearchResult';

export default {
  name: 'UserSearchPage',
  components: {
    SearchResult
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/pages/userSearch';
</style>
