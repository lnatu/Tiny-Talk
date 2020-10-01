<template>
  <section class="pb-detail flex-1 hide-scrollbar overflow-auto">
    <a href="#" v-if="isMobile" @click="DEL_ONE_CONTACT">
      <svg class="icon-svg icon-svg--2x icon-svg--dark">
        <use xlink:href="@/assets/img/icons/sprites.svg#icon-arrow-left" />
      </svg>
    </a>
    <figure class="pb-hero">
      <div class="pb-hero-avatar">
        <img
          class="d-block mx-auto"
          :src="require(`@/assets/img/users/${GET_ONE_CONTACT.contact.avatar}`)"
          :alt="GET_ONE_CONTACT.contact.fullName"
        />
      </div>
      <figcaption class="pb-hero-caption text-center">
        <div class="pb-hero-name">
          {{ GET_ONE_CONTACT.contact.fullName }}
        </div>
        <div class="pb-hero-actions">
          <a class="pb-hero-cta bg-primary" href="#">
            <svg class="pb-hero-icon">
              <use
                xlink:href="@/assets/img/icons/sprites.svg#icon-commenting-o"
              />
            </svg>
          </a>
          <a class="pb-hero-cta bg-success" href="#">
            <svg class="pb-hero-icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-phone" />
            </svg>
          </a>
        </div>
      </figcaption>
    </figure>
    <div class="personal-info mt-3">
      <ul class="personal-info__list list-style-none">
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Local Time</p>
            <p class="text-a mt-1">10:25 PM</p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-time" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Birthday</p>
            <p class="text-a mt-1">
              {{ formatDate(GET_ONE_CONTACT.contact.birthday) }}
            </p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-calendar" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Phone</p>
            <p class="text-a mt-1">
              {{
                GET_ONE_CONTACT.contact.phone
                  ? GET_ONE_CONTACT.contact.phone
                  : '***'
              }}
            </p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-mobile" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Email</p>
            <p class="text-a mt-1">
              {{ GET_ONE_CONTACT.contact.email }}
            </p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-envelope" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Website</p>
            <div class="mt-1">
              <a :href="'#'" class="text-a">
                {{
                  GET_ONE_CONTACT.contact.website
                    ? GET_ONE_CONTACT.contact.website
                    : '---'
                }}
              </a>
            </div>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-earth" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Address</p>
            <p class="text-a mt-1">
              {{
                GET_ONE_CONTACT.contact.address
                  ? GET_ONE_CONTACT.contact.address
                  : '---'
              }}
            </p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-home" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
    <div class="personal-info mt-3">
      <ul class="personal-info__list list-style-none">
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Facebook</p>
            <p class="text-a mt-1">
              ---
            </p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-facebook" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Twitter</p>
            <p class="text-a mt-1">---</p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-twitter" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Instagram</p>
            <p class="text-a mt-1">
              ---
            </p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-instagram" />
            </svg>
          </div>
        </li>
        <li
          class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
        >
          <div class="personal-info__left">
            <p class="title-small text-light">Linkedin</p>
            <p class="text-a mt-1">---</p>
          </div>
          <div class="personal-info__right text-right">
            <svg class="icon-svg--2x">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-linkedin" />
            </svg>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'PBDetail',
  computed: {
    ...mapGetters(['GET_ONE_CONTACT'])
  },
  methods: {
    ...mapMutations(['DEL_ONE_CONTACT'])
  }
};
</script>
