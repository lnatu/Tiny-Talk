<template>
  <div class="conversation-footer">
    <transition name="slide-up">
      <VEmojiPicker v-if="showEmoji" @select="selectEmoji" />
    </transition>
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
            ref="inputMessage"
            v-model="message"
            id="self-message"
            class="no-resize hide-scrollbar"
            name="self-message"
            rows="5"
            placeholder="Your message..."
            @input="
              updateTyping({
                conversationId: GET_ONE_CONVERSATION._id,
                contactId: contact._id
              })
            "
          />
          <a class="emoji-picker" href="#">
            <img
              src="@/assets/img/logo/emoji.svg"
              width="20px"
              height="20px"
              @click="showEmoji = !showEmoji"
            />
          </a>
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
    <transition name="fade">
      <a
        class="jump-to-end"
        href="#"
        v-if="GET_SHOW_JTB"
        @click.prevent="jumpDown"
      >
        <svg class="icon-svg icon-svg--2x icon-svg--theme">
          <use xlink:href="@/assets/img/icons/sprites.svg#icon-chevrons-down" />
        </svg>
      </a>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import VEmojiPicker from 'v-emoji-picker';
import mixin from '@/mixins/global';

export default {
  name: 'ConversationFooter',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  components: {
    VEmojiPicker
  },
  computed: {
    ...mapGetters(['GET_ONE_CONVERSATION', 'GET_LOCAL_USER', 'GET_SHOW_JTB'])
  },
  data() {
    return {
      message: '',
      showEmoji: false
    };
  },
  mixins: [mixin],
  methods: {
    ...mapMutations([
      'SWAP_CONVERSATION_INDEX',
      'PUSH_NEW_MESSAGE_CONVERSATION',
      'SET_SHOW_JTB'
    ]),
    ...mapActions(['sendMessage']),
    async sendMyMessage() {
      const _thisConversation = this.GET_ONE_CONVERSATION;
      const _thisUser = this.GET_LOCAL_USER;
      const contact = _thisConversation.participants.find(
        p => p._id !== _thisUser._id
      );

      this.$socket.emit('typing-off', {
        contactId: contact._id,
        conversationId: _thisConversation._id
      });

      this.SWAP_CONVERSATION_INDEX({
        conversation: _thisConversation,
        next: true
      });

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

        this.message = '';
        this.$refs.inputMessage.focus();
        this.showEmoji = false;

        this.$socket.emit('send-message', {
          contactId: contact._id,
          conversation,
          message
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    },
    jumpDown() {
      const convBody = document.querySelector('.conversation-content');
      this.scrollTo(convBody, convBody.scrollHeight, 1000);
      setTimeout(() => {
        this.SET_SHOW_JTB(false);
      }, 1000);
    },
    selectEmoji(emoji) {
      this.message += emoji.data;
    }
  }
};
</script>

<style lang="scss" scoped>
#EmojiPicker {
  position: absolute;
  right: 15%;
  top: -20px;
  z-index: 99;

  transform: translateY(-100%);
}
</style>
