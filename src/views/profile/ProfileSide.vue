<template>
  <aside class="profile-sidebar bg-light-2">
    <div class="section-header line-height-1">
      <h5 class="title mb-1">Profile</h5>
      <p>Personal Information & Settings</p>
    </div>
    <div class="profile-side-body hide-scrollbar">
      <figure class="profile-picture position-relative">
        <div class="picture-holder">
          <img
            class="d-block"
            :src="require(`@/assets/img/users/${GET_LOCAL_USER.avatar}`)"
            alt="test"
          />
        </div>
        <figcaption class="mt-2">
          {{ `${GET_LOCAL_USER.lastName} ${GET_LOCAL_USER.firstName}` }}
        </figcaption>
        <label for="upload" class="upload-profile-pic" type="button">
          <svg class="icon-svg--2x icon-svg--white">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-camera" />
          </svg>
        </label>
        <input
          id="upload"
          ref="uploadPhoto"
          v-show="false"
          type="file"
          accept="image/*"
          @change="SET_SHOW_SAVE_IMAGE(true)"
        />
        <button
          v-if="GET_SHOW_SAVE_IMAGE"
          class="btn btn-submit align-self-end mr-2"
          @click="uploadHandler"
        >
          Save change
        </button>
      </figure>
      <div class="personal-info mt-3">
        <ul class="personal-info__list list-style-none">
          <li
            class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
          >
            <div class="personal-info__left">
              <p class="title-small text-light">Local Time</p>
              <p class="text-a mt-sm">10:25 PM</p>
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
              <p class="text-a mt-sm">
                {{ formatDate(GET_LOCAL_USER.birthday) || '---' }}
              </p>
            </div>
            <div class="personal-info__right text-right">
              <svg class="icon-svg--2x">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-calendar"
                />
              </svg>
            </div>
          </li>
          <li
            class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
          >
            <div class="personal-info__left">
              <p class="title-small text-light">Phone</p>
              <p class="text-a mt-sm">{{ GET_LOCAL_USER.phone || '---' }}</p>
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
              <p class="text-a mt-sm">{{ GET_LOCAL_USER.email }}</p>
            </div>
            <div class="personal-info__right text-right">
              <svg class="icon-svg--2x">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-envelope"
                />
              </svg>
            </div>
          </li>
          <li
            class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
          >
            <div class="personal-info__left">
              <p class="title-small text-light">Website</p>
              <div>
                <a
                  v-if="GET_LOCAL_USER.website"
                  :href="GET_LOCAL_USER.website || '#'"
                  class="text-a mt-sm"
                >
                  {{ GET_LOCAL_USER.website }}
                </a>
                <p v-else>---</p>
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
              <p class="text-a mt-sm">
                {{ GET_LOCAL_USER.address || '---' }}
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
              <p class="text-a mt-sm">
                {{ GET_LOCAL_USER.facebooks || '---' }}
              </p>
            </div>
            <div class="personal-info__right text-right">
              <svg class="icon-svg--2x">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-facebook"
                />
              </svg>
            </div>
          </li>
          <li
            class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
          >
            <div class="personal-info__left">
              <p class="title-small text-light">Twitter</p>
              <p class="text-a mt-sm">{{ GET_LOCAL_USER.twitter || '---' }}</p>
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
              <p class="text-a mt-sm">
                {{ GET_LOCAL_USER.instagram || '---' }}
              </p>
            </div>
            <div class="personal-info__right text-right">
              <svg class="icon-svg--2x">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-instagram"
                />
              </svg>
            </div>
          </li>
          <li
            class="personal-info__item d-flex align-items-center justify-content-between line-height-1"
          >
            <div class="personal-info__left">
              <p class="title-small text-light">Linkedin</p>
              <p class="text-a mt-sm">{{ GET_LOCAL_USER.linkedin || '---' }}</p>
            </div>
            <div class="personal-info__right text-right">
              <svg class="icon-svg--2x">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-linkedin"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import mixin from '@/mixins/global';

export default {
  name: 'ProfileSide',
  mixins: [mixin],
  computed: {
    ...mapGetters(['GET_LOCAL_USER', 'GET_SHOW_SAVE_IMAGE'])
  },
  methods: {
    ...mapMutations(['SET_SHOW_SAVE_IMAGE']),
    ...mapActions(['updateAvatar']),
    async uploadHandler() {
      const fd = new FormData();
      fd.append('photo', this.$refs.uploadPhoto.files[0]);
      await this.updateAvatar(fd);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/profile/_profileSide';
</style>
