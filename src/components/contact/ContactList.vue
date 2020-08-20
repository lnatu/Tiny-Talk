<template>
  <ul class="contact-list list-style-none">
    <ContactItem
      v-for="contact in GET_CONTACTS"
      :contact="contact"
      :key="contact._id"
    />
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import ContactItem from '@/components/contact/ContactItem';

export default {
  name: 'ContactList',
  components: {
    ContactItem
  },
  computed: {
    ...mapGetters(['GET_CONTACTS'])
  }
};
</script>
