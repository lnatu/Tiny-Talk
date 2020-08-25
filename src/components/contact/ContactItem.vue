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
          <h6 class="contact-name">
            {{ `${contact.fullName}` }}
          </h6>
          <div class="chat-time" v-if="lastMessageSent">
            {{ formatAMPM(new Date(lastMessageSent.createdAt)) }}
          </div>
        </div>
        <div class="contact-text">
          <p v-if="lastMessageSent">
            {{ lastMessageSent.message }}
          </p>
          <p v-else>Say hi</p>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import mixin from '@/mixins/global';

export default {
  name: 'ContactItem',
  props: {
    contact: {
      type: Object,
      required: true
    },
    messages: {
      type: Array,
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
      'GET_CONVERSATIONS',
      'GET_ONE_CONVERSATION'
    ]),
    contactActive() {
      if (!this.GET_ONE_CONVERSATION) {
        return false;
      }
      return (
        this.GET_ONE_CONVERSATION._id === this.GET_CONVERSATIONS[this.index]._id
      );
    },
    lastMessageSent() {
      if (this.messages.length === 0) {
        return false;
      }

      const totalMessages = this.messages.length;
      return this.messages[totalMessages - 1];
    }
  },
  mixins: [mixin],
  methods: {
    ...mapMutations(['FIND_CONVERSATION']),
    startChat() {
      this.FIND_CONVERSATION({ index: this.index });
    }
  }
};
</script>
