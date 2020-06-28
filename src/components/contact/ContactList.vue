<template>
  <ul class="contact-list list-style-none">
    <ContactItem v-for="n in 10" :test="n" :key="n" />
  </ul>
</template>

<script>
import ContactItem from '@/components/contact/ContactItem';

export default {
  name: 'ContactList',
  components: {
    ContactItem
  }
};
</script>

<style scoped></style>
