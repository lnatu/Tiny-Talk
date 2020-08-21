<template>
  <div class="h-100">
    <div v-if="GET_CONTACTS.length > 0" class="h-100">
      <ul class="contact-list list-style-none">
        <ContactItem
          v-for="(item, i) in GET_CONTACTS"
          :contact="item.contact"
          :index="i"
          :key="item._id"
        />
      </ul>
    </div>
    <div v-else class="text-center bg-light-2 h-100 pt-3">
      <div>Nothing here...</div>
      <div>😢 😢 😢</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import ContactItem from '@/components/contact/ContactItem';

export default {
  name: 'ContactList',
  components: {
    ContactItem
  },
  computed: {
    ...mapGetters(['GET_CONTACTS'])
  },
  methods: {
    ...mapMutations(['SET_CONTACTS'])
  }
};
</script>
