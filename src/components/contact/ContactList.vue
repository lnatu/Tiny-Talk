<template>
  <div class="h-100">
    <div v-if="GET_CONVERSATIONS.length > 0" class="h-100">
      <ul class="contact-list list-style-none">
        <ContactItem
          v-for="(item, i) in GET_CONVERSATIONS"
          :contact="item.participants.find(p => p._id !== GET_LOCAL_USER._id)"
          :messages="item.messages"
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
import { mapGetters } from 'vuex';
import ContactItem from '@/components/contact/ContactItem';

export default {
  name: 'ContactList',
  components: {
    ContactItem
  },
  computed: {
    ...mapGetters(['GET_LOCAL_USER', 'GET_CONVERSATIONS'])
  }
};
</script>
