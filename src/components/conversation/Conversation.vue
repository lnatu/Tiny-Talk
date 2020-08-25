<template>
  <div class="conversation h-100">
    <div class="h-100" v-if="GET_ONE_CONVERSATION">
      <conversation-header />
      <conversation-content :contact="contact" />
      <conversation-footer :contact="contact" />
    </div>
    <div class="d-flex align-items-center justify-content-center h-100" v-else>
      <h1>Start talking</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ConversationHeader from '@/components/conversation/ConversationHeader';
import ConversationContent from '@/components/conversation/ConversationContent';
import ConversationFooter from '@/components/conversation/ConversationFooter';

export default {
  name: 'AppConversation',
  components: {
    ConversationHeader,
    ConversationContent,
    ConversationFooter
  },
  computed: {
    ...mapGetters(['GET_ONE_CONVERSATION', 'GET_LOCAL_USER']),
    contact() {
      return this.GET_ONE_CONVERSATION.participants.find(
        cp => cp._id !== this.GET_LOCAL_USER._id
      );
    }
  }
};
</script>
