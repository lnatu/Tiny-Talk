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
            @click.prevent="
              sendMessage({ conversation: GET_ONE_CONVERSATION._id, message })
            "
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ConversationFooter',
  computed: {
    ...mapGetters(['GET_ONE_CONVERSATION'])
  },
  data() {
    return {
      message: ''
    };
  },
  methods: {
    ...mapActions(['sendMessage'])
  }
};
</script>

<style scoped></style>
