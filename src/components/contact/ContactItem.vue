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
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
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
    ...mapGetters(['GET_ONE_CONTACT', 'GET_ONE_CONVERSATION']),
    contactActive() {
      if (Object.keys(this.GET_ONE_CONVERSATION).length === 0) {
        return false;
      }
      return this.GET_ONE_CONVERSATION.participants.find(
        p => p._id === this.contact._id
      );
    }
  },
  methods: {
    ...mapMutations(['FIND_CONVERSATION']),
    startChat() {
      this.FIND_CONVERSATION({ userId: this.contact._id });
    }
  }
};
</script>
