<template>
  <aside class="sidebar h-100">
    <app-sidebar-header />
    <ContactList />
  </aside>
</template>

<script>
import { mapActions } from 'vuex';
import AppSidebarHeader from '@/components/shared/AppSidebarHeader';
import ContactList from '@/components/contact/ContactList';

export default {
  name: 'AppSidebar',
  components: {
    AppSidebarHeader,
    ContactList
  },
  methods: {
    ...mapActions(['getMyContacts', 'getMyConversations'])
  },
  created() {
    this.getMyConversations();
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/_sidebar';
</style>
