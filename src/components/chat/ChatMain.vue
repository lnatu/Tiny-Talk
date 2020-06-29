<template>
  <section class="chats">
    <div class="conversation">
      <div class="conversation-header">
        <div class="media">
          <div class="media__avatar mr-2">
            <img src="@/assets/img/users/girl.png" alt="girl" />
          </div>
          <div class="media__body">
            <h6 class="media__name">Demi Lovato</h6>
            <p class="media__status text-muted mt-sm">Online</p>
          </div>
        </div>
        <ul class="media-nav list-style-none">
          <li class="media-nav__item">
            <a class="media-nav__link" href="#">
              <svg class="media-nav__icon">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-search" />
              </svg>
            </a>
          </li>
          <li class="media-nav__item">
            <a class="media-nav__link" href="#">
              <svg class="media-nav__icon">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-phone-call" />
              </svg>
            </a>
          </li>
          <li class="media-nav__item">
            <a class="media-nav__link" href="#">
              <svg class="media-nav__icon">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-more-vert" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ChatMain'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_conversation';
</style>
