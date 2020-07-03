<template>
  <div class="contact-body hide-scrollbar">
    <div class="profile">
      <div class="profile-avatar">
        <img src="@/assets/img/users/girl.png" alt="girl" />
      </div>
      <div class="profile-text">
        <h4 class="text-medium">Demi Lovato</h4>
        <p
          class="text-light d-flex align-items-center justify-content-center mt-1 text-small"
        >
          <svg class="icon-svg--1x cursor-pointer mr-sm">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-map-pin" />
          </svg>
          <span>San Fransisco, CA</span>
        </p>
      </div>
      <div class="profile-actions">
        <a class="profile-actions__item border-light bg-white" href="#">
          <svg class="icon-svg--2x cursor-pointer">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-user-plus" />
          </svg>
        </a>
        <a class="profile-actions__item bg-theme" href="#">
          <svg class="icon-svg--2x icon-svg--white cursor-pointer">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-heart-o" />
          </svg>
        </a>
        <a class="profile-actions__item bg-danger" href="#">
          <svg class="icon-svg--2x icon-svg--white cursor-pointer">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-slash" />
          </svg>
        </a>
      </div>
    </div>
    <div class="user-info">
      <div class="user-info__header">
        <h5>User Information</h5>
        <svg class="icon-svg--1x cursor-pointer">
          <use xlink:href="@/assets/img/icons/sprites.svg#icon-info" />
        </svg>
      </div>
      <div class="user-info__content">
        <h6 class="info-label">Phone</h6>
        <p class="info-text">+01-222-364522</p>
      </div>
      <div class="user-info__content">
        <h6 class="info-label">Email</h6>
        <p class="info-text">catherine.richardson@gmail.com</p>
      </div>
      <div class="user-info__content">
        <h6 class="info-label">Address</h6>
        <p class="info-text">
          1134 Ridder Park Road, San Fransisco, CA 94851
        </p>
      </div>
    </div>
    <div class="user-info">
      <div class="user-info__header">
        <h5>Shared Media</h5>
        <svg class="icon-svg--1x cursor-pointer">
          <use xlink:href="@/assets/img/icons/sprites.svg#icon-picture" />
        </svg>
      </div>
      <div class="shared-media">
        <a class="shared-media__item" href="#">
          <img src="@/assets/img/files/f1.png" alt="file 1" />
        </a>
        <a class="shared-media__item" href="#">
          <img src="@/assets/img/files/f2.png" alt="file 2" />
        </a>
        <a class="shared-media__item" href="#">
          <img src="@/assets/img/files/f3.png" alt="file 3" />
        </a>
      </div>
    </div>
    <div class="user-info p-0 pt-2">
      <div class="user-info__header px-2">
        <h5>Shared Files</h5>
        <svg class="icon-svg--1x cursor-pointer">
          <use xlink:href="@/assets/img/icons/sprites.svg#icon-file" />
        </svg>
      </div>
      <div class="shared-media">
        <div
          class="document d-flex align-items-center line-height-1 border-bottom p-2 pt-0 w-100"
        >
          <div class="document__left">
            <svg class="document__icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-file-text" />
            </svg>
          </div>
          <div class="document__right">
            <h6 class="document__name">
              <a href="#" title="global-warming-data-2020.xlxs"
                >global-warming-data-2020.xlxs</a
              >
            </h6>
            <div class="document-info mt-sm">
              <span class="document-info__text">79.2 KB</span>
              <span class="document-info__text ml-1">XLXS</span>
            </div>
          </div>
        </div>
        <div
          class="document d-flex align-items-center line-height-1 border-bottom p-2 w-100"
        >
          <div class="document__left">
            <svg class="document__icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-file-text" />
            </svg>
          </div>
          <div class="document__right">
            <h6 class="document__name">
              <a href="#" title="global-warming-data-2020.xlxs"
                >global-warming-data-2020.xlxs</a
              >
            </h6>
            <div class="document-info mt-sm">
              <span class="document-info__text">79.2 KB</span>
              <span class="document-info__text ml-1">XLXS</span>
            </div>
          </div>
        </div>
        <div
          class="document d-flex align-items-center line-height-1 border-bottom p-2 w-100"
        >
          <div class="document__left">
            <svg class="document__icon">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-file-text" />
            </svg>
          </div>
          <div class="document__right">
            <h6 class="document__name">
              <a href="#" title="global-warming-data-2020.xlxs"
                >global-warming-data-2020.xlxs</a
              >
            </h6>
            <div class="document-info mt-sm">
              <span class="document-info__text">79.2 KB</span>
              <span class="document-info__text ml-1">XLXS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileBody'
};
</script>
