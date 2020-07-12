<template>
  <aside class="profile-sidebar bg-light-2">
    <div class="section-header line-height-1">
      <h5 class="title mb-1">Profile</h5>
      <p>Personal Information & Settings</p>
    </div>
    <div class="profile-side-body hide-scrollbar">
      <figure class="profile-picture position-relative">
        <div class="picture-holder">
          <img class="d-block" src="@/assets/img/users/girl.png" alt="test" />
        </div>
        <figcaption class="mt-2">
          Demi Lovato
        </figcaption>
        <button class="upload-profile-pic" type="button">
          <svg class="icon-svg--2x icon-svg--white">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-camera" />
          </svg>
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
              <p class="text-a mt-sm">20/11/1992</p>
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
              <p class="text-a mt-sm">+01-222-364522</p>
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
              <p class="text-a mt-sm">catherine.richardson@gmail.com</p>
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
              <p class="text-a mt-sm">www.catherichardson.com</p>
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
                1134 Ridder Park Road, San Fransisco, CA 94851
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
              <p class="text-a mt-sm">10:25 PM</p>
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
              <p class="text-a mt-sm">20/11/1992</p>
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
              <p class="text-a mt-sm">+01-222-364522</p>
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
              <p class="text-a mt-sm">catherine.richardson@gmail.com</p>
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
export default {
  name: 'ProfileSide'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/profile/_profileSide';
</style>
