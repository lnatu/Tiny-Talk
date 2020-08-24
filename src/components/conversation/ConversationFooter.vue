<template>
  <div class="conversation-footer">
    <form action="#">
      <div class="typing-area">
        <div class="typing-box media">
          <div class="media-options">
            <a class="media-options__cta" href="#">
              <svg class="media-options__icon">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-add" />
              </svg>
            </a>
            <div class="media-popup">
              <a class="media-popup__item" href="#">
                <svg class="media-popup__icon">
                  <use xlink:href="@/assets/img/icons/sprites.svg#icon-files" />
                </svg>
                <span class="ml-1">Files</span>
              </a>
              <a class="media-popup__item" href="#">
                <svg class="media-popup__icon">
                  <use xlink:href="@/assets/img/icons/sprites.svg#icon-mic" />
                </svg>
                <span class="ml-1">Audio</span>
              </a>
              <a class="media-popup__item" href="#">
                <svg class="media-popup__icon">
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-piechart"
                  />
                </svg>
                <span class="ml-1">Poll</span>
              </a>
            </div>
          </div>
        </div>
        <div class="typing-box prepare-message">
          <textarea
            v-model="message"
            id="self-message"
            class="no-resize"
            name="self-message"
            rows="5"
            placeholder="Your message..."
          />
        </div>
        <div class="typing-box cta">
          <a
            class="cta-send d-flex align-items-center justify-content-center"
            href="#"
            @click.prevent="sendMyMessage"
          >
            <svg class="cta-send__icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-send" />
            </svg>
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import mixin from '@/mixins/global';

export default {
  name: 'ConversationFooter',
  computed: {
    ...mapGetters(['GET_ONE_CONVERSATION', 'GET_LOCAL_USER'])
  },
  data() {
    return {
      message: ''
    };
  },
  mixins: [mixin],
  methods: {
    ...mapMutations([
      'SWAP_CONVERSATION_INDEX',
      'PUSH_NEW_MESSAGE_CONVERSATION'
    ]),
    ...mapActions(['sendMessage']),
    async sendMyMessage() {
      const _thisConversation = this.GET_ONE_CONVERSATION;
      const _thisUser = this.GET_LOCAL_USER;
      const contact = _thisConversation.participants.find(
        p => p._id !== _thisUser._id
      );

      this.SWAP_CONVERSATION_INDEX(_thisConversation);

      try {
        const res = await this.sendMessage({
          conversation: _thisConversation._id,
          message: this.message
        });

        const { conversation, message } = res.data.data;

        this.PUSH_NEW_MESSAGE_CONVERSATION({ message, conversation });

        setTimeout(() => {
          this.scrollToBottom(document.querySelector('.conversation-content'));
        }, 100);

        this.$socket.emit('send-message', {
          contactId: contact._id,
          conversation,
          message
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    }
  }
};
</script>