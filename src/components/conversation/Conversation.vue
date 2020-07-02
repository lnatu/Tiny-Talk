<template>
  <div class="conversation h-100">
    <conversation-header />
    <conversation-content />
    <conversation-footer />
  </div>
</template>

<script>
import ConversationHeader from '@/components/conversation/ConversationHeader';
import ConversationContent from '@/components/conversation/ConversationContent';
import ConversationFooter from '@/components/conversation/ConversationFooter';

export default {
  name: 'AppConversation',
  components: {
    ConversationHeader,
    ConversationContent,
    ConversationFooter
  }
};
</script>
