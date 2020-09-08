<template>
  <div class="conversation-header">
    <div class="media">
      <div class="media__avatar mr-2">
        <img
          :src="require(`@/assets/img/users/${contact.avatar}`)"
          alt="girl"
        />
      </div>
      <div class="media__body">
        <h6 class="media__name">
          {{ `${contact.lastName} ${contact.firstName}` }}
        </h6>
        <p class="media__status text-muted mt-sm">Online</p>
      </div>
    </div>
    <ul
      class="media-nav list-style-none flex-1 justify-content-end position-relative"
    >
      <li class="media-nav__item">
        <a
          class="media-nav__link"
          href="#"
          @click.prevent="subNavShow = !subNavShow"
        >
          <svg class="media-nav__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-more-vert" />
          </svg>
        </a>
      </li>
      <transition name="slide-down">
        <div class="media-sub-nav" v-if="subNavShow">
          <a
            class="d-flex align-items-center"
            href="#"
            @click.prevent="SET_SHOW_CONV_INFO(true)"
          >
            <svg class="media-nav__icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-info" />
            </svg>
            <span>View info</span>
          </a>
          <a class="d-flex align-items-center" href="#">
            <svg class="media-nav__icon">
              <use
                xlink:href="@/assets/img/icons/sprites.svg#icon-phone-call"
              />
            </svg>
            <span>Call</span>
          </a>
          <a class="d-flex align-items-center" href="#">
            <svg class="media-nav__icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-search" />
            </svg>
            <span>Find message</span>
          </a>
        </div>
      </transition>
      <!--      <li class="media-nav__item">-->
      <!--        <a-->
      <!--          class="media-nav__link"-->
      <!--          href="#"-->
      <!--          @click.prevent="SET_SHOW_CONV_INFO(true)"-->
      <!--        >-->
      <!--          <svg class="media-nav__icon">-->
      <!--            <use xlink:href="@/assets/img/icons/sprites.svg#icon-info" />-->
      <!--          </svg>-->
      <!--        </a>-->
      <!--      </li>-->
      <!--      <li class="media-nav__item">-->
      <!--        <a class="media-nav__link" href="#">-->
      <!--          <svg class="media-nav__icon">-->
      <!--            <use xlink:href="@/assets/img/icons/sprites.svg#icon-phone-call" />-->
      <!--          </svg>-->
      <!--        </a>-->
      <!--      </li>-->
      <!--      <li class="media-nav__item">-->
      <!--        <a class="media-nav__link" href="#">-->
      <!--          <svg class="media-nav__icon">-->
      <!--            <use xlink:href="@/assets/img/icons/sprites.svg#icon-search" />-->
      <!--          </svg>-->
      <!--        </a>-->
      <!--      </li>-->
      <li
        class="media-nav__item"
        v-if="isMobile"
        @click="SET_CONVERSATION_MOBILE(false)"
      >
        <a class="media-nav__link" href="#">
          <svg class="media-nav__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-close" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'ConversationHeader',
  computed: {
    ...mapGetters(['GET_ONE_CONVERSATION', 'GET_LOCAL_USER']),
    contact() {
      return this.GET_ONE_CONVERSATION.participants.find(
        p => p._id !== this.GET_LOCAL_USER._id
      );
    }
  },
  data() {
    return {
      subNavShow: false
    };
  },
  methods: {
    ...mapMutations(['SET_CONVERSATION_MOBILE', 'SET_SHOW_CONV_INFO'])
  }
};
</script>
