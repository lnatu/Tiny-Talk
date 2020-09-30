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
              <label for="addFile" class="media-popup__item" href="#">
                <svg class="media-popup__icon">
                  <use xlink:href="@/assets/img/icons/sprites.svg#icon-files" />
                </svg>
                <span class="ml-1">Files</span>
              </label>
              <input
                type="file"
                multiple
                id="addFile"
                ref="messImages"
                v-show="false"
                @change="previewUploadedImages($event)"
              />
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
    <transition name="slide-up">
      <div id="imagesPreview" v-if="imageFiles.length > 0">
        <div
          class="img-preview w-100 hide-scrollbar"
          ref="imagesPreview"
          @mousedown="touchElement($event)"
          @mouseup="touchElementLose()"
          @mouseleave="touchEl = false"
          @mousemove="touchElementMove($event)"
        >
          <div
            class="img-preview__box"
            v-for="(fileSrc, i) in imageFiles"
            :key="i"
          >
            <img :src="fileSrc" alt="default" />
          </div>
        </div>
        <div class="img-preview__close bg-danger" @click="imageFiles = []">
          <svg class="icon-svg icon-svg--2x icon-svg--white">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-x" />
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import VEmojiPicker from 'v-emoji-picker';

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
      showEmoji: false,
      touchEl: false,
      touchStartX: 0,
      touchScrollLeft: 0,
      touchPrevScrollLeft: 0,
      velX: 0,
      momentumId: '',
      imageFiles: []
    };
  },
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
        const fd = new FormData();

        const filesSize = this.$refs.messImages.files.length;
        for (let i = 0; i < filesSize; i++) {
          fd.append('images', this.$refs.messImages.files[i]);
        }
        fd.append('conversation', _thisConversation._id);
        fd.append('message', this.message);

        const res = await this.sendMessage(fd);

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
    },
    touchElement(e) {
      this.touchEl = true;
      const element = this.$refs.imagesPreview;
      this.touchStartX = e.pageX - element.offsetLeft;
      this.touchScrollLeft = element.scrollLeft;
    },
    touchElementLose() {
      this.touchEl = false;
      this.beginMomentumTracking();
    },
    touchElementMove(e) {
      if (!this.touchEl) {
        return;
      }
      e.preventDefault();
      const element = this.$refs.imagesPreview;
      const x = e.pageX - element.offsetLeft;
      const walk = (x - this.touchStartX) * 3;
      this.touchPrevScrollLeft = element.scrollLeft;
      element.scrollLeft = this.touchScrollLeft - walk;
      this.velX = element.scrollLeft - this.touchPrevScrollLeft;
    },
    beginMomentumTracking() {
      this.cancelMomentumTracking();
      this.momentumId = requestAnimationFrame(this.momentumLoop);
    },
    cancelMomentumTracking() {
      cancelAnimationFrame(this.momentumId);
    },
    momentumLoop() {
      this.$refs.imagesPreview.scrollLeft += this.velX;
      this.velX *= 0.95;
      if (Math.abs(this.velX) > 0.5) {
        this.momentumId = requestAnimationFrame(this.momentumLoop);
      }
    },
    /* eslint-disable*/
    previewUploadedImages(e, holder) {
      const input = e.target;
      if (!input.files) {
        return;
      }

      let filesSize = input.files.length;
      for (let i = 0; i < filesSize; i++) {
        let reader = new FileReader();
        reader.onload = event => {
          this.imageFiles.push(event.target.result);
        };
        reader.readAsDataURL(input.files[i]);
      }
    },
    resizeImage(fileSrc, file) {
      const img = document.createElement('img');
      img.src = fileSrc;

      const canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const MAX_WIDTH = 200;
      const MAX_HEIGHT = 200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      return canvas.toDataURL(file.type);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/mixins/_mobile.scss';

#EmojiPicker {
  position: absolute;
  right: 20px;
  top: -20px;
  z-index: 99;

  transform: translateY(-100%);

  @include mobile {
    width: 100%;
    top: 0;
    right: 0;
  }

  @media only screen and (min-width: 768px) {
    width: auto;
  }
}
</style>
