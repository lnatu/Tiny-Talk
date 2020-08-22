<template>
  <li class="contact-item">
    <a
      href="#"
      class="contact-link"
      :class="{ active: contactActive }"
      @click.prevent="startChat"
    >
      <div class="contact-avatar online mr-2">
        <img
          class="contact-avatar__pic"
          :src="require(`@/assets/img/users/${contact.avatar}`)"
          alt="girl"
        />
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <h6 class="contact-name">{{ contact.fullName }}</h6>
          <div class="chat-time">Just now</div>
        </div>
        <div class="contact-text">
          <p
            v-if="lastMessageSent && contact._id === lastMessageSent.sender._id"
          >
            {{ lastMessageSent.message }}
          </p>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ContactItem',
  props: {
    contact: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapGetters([
      'GET_LOCAL_USER',
      'GET_ONE_CONTACT',
      'GET_ONE_CONVERSATION'
    ]),
    contactActive() {
      if (Object.keys(this.GET_ONE_CONVERSATION).length === 0) {
        return false;
      }
      return this.GET_ONE_CONVERSATION.participants.find(
        p => p._id === this.contact._id
      );
    },
    lastMessageSent() {
      if (Object.keys(this.GET_ONE_CONVERSATION).length === 0) {
        return false;
      }

      const totalMessages = this.GET_ONE_CONVERSATION.messages.length;
      return this.GET_ONE_CONVERSATION.messages[totalMessages - 1];
    }
  },
  methods: {
    ...mapMutations(['FIND_CONVERSATION']),
    startChat() {
      this.FIND_CONVERSATION({ userId: this.contact._id });
      console.log(this.GET_ONE_CONVERSATION);
    }
  }
};
</script>
