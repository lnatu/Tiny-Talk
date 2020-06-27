<template>
  <div class="navigation">
    <a class="logo__button" href="#">
      <svg class="logo__icon">
        <use xlink:href="@/assets/img/icons/sprites.svg#icon-clockify"></use>
      </svg>
    </a>
    <ul class="navigation-list">
      <li class="navigation-item">
        <a class="navigation-link active" href="#">
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-bubble" />
          </svg>
        </a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="#">
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-phone-call" />
          </svg>
        </a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="#">
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-users" />
          </svg>
        </a>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="#">
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-settings" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/components/_navigation';
</style>
