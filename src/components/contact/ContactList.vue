<template>
  <div class="h-100">
    <div class="h-100" v-if="!GET_CONVERSATION_LOADER">
      <div v-if="GET_CONVERSATIONS.length > 0" class="h-100">
        <ul class="contact-list list-style-none">
          <ContactItem
            v-for="(item, i) in GET_CONVERSATIONS"
            :conversationId="item._id"
            :contact="item.participants.find(p => p._id !== GET_LOCAL_USER._id)"
            :messages="item.messages"
            :index="i"
            :key="item._id"
          />
        </ul>
      </div>
      <div class="h-100 text-center bg-light-2 h-100 pt-3" v-else>
        No conversation here ...
      </div>
    </div>
    <content-placeholder v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ContactItem from '@/components/contact/ContactItem';
import ContentPlaceholder from '@/components/loading/ContentPlaceholder';

export default {
  name: 'ContactList',
  components: {
    ContactItem,
    ContentPlaceholder
  },
  computed: {
    ...mapGetters([
      'GET_LOCAL_USER',
      'GET_CONVERSATIONS',
      'GET_CONVERSATION_LOADER'
    ])
  }
};
</script>
