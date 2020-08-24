<template>
  <div class="h-100">
    <div class="h-100" v-if="!GET_CONVERSATION_LOADER">
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
      <div class="h-100 text-center bg-light-2 h-100 pt-3" v-else>
        No conversation here ...
      </div>
    </div>
    <div v-else class="text-center bg-light-2 h-100 pt-3">
      <ul class="contact-list list-style-none overflow-hidden">
        <li class="contact-item loader" v-for="i in 7" :key="i">
          <ContentLoader :height="'92'" :primaryColor="'#C4C2C8'">
            <rect x="70" y="30%" rx="4" ry="4" width="150" height="10" />
            <rect x="340" y="30%" rx="4" ry="4" width="50" height="10" />
            <rect x="70" y="55%" rx="3" ry="3" width="320" height="10" />
            <circle cx="30" cy="50%" r="25" />
          </ContentLoader>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { ContentLoader } from 'vue-content-loader';
import ContactItem from '@/components/contact/ContactItem';

export default {
  name: 'ContactList',
  components: {
    ContactItem,
    ContentLoader
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
