<template>
  <div class="picture-swipe">
    <div class="picture-swipe__wrapper">
      <div class="picture-swipe__overview text-center">
        <figure>
          <img :src="pictures[0]" alt="" />
        </figure>
      </div>
      <div class="picture-swipe__thumbnails hide-scrollbar">
        <figure
          class="picture-swipe__thumbnail"
          v-for="pic in pictures"
          :key="pic"
        >
          <img class="d-block" :src="pic" alt="pic" />
        </figure>
      </div>
      <div class="picture-swipe__nav">
        <a href="#">
          <svg class="icon-svg icon-svg--2x icon-svg--white">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-zoomin" />
          </svg>
        </a>
        <a href="#">
          <svg class="icon-svg icon-svg--2x icon-svg--white">
            <use
              xlink:href="@/assets/img/icons/sprites.svg#icon-fullscreen-alt"
            />
          </svg>
        </a>
        <a href="#">
          <svg class="icon-svg icon-svg--2x icon-svg--white">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-close" />
          </svg>
        </a>
      </div>
      <div class="picture-swipe__arrow picture-swipe__prev">
        <a href="#">
          <svg class="icon-svg icon-svg--2x icon-svg--white">
            <use
              xlink:href="@/assets/img/icons/sprites.svg#icon-arrow-thin-left"
            />
          </svg>
        </a>
      </div>
      <div class="picture-swipe__arrow picture-swipe__next">
        <a href="#">
          <svg class="icon-svg icon-svg--2x icon-svg--white">
            <use
              xlink:href="@/assets/img/icons/sprites.svg#icon-arrow-thin-right"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PictureSwipe',
  props: {
    pictures: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.picture-swipe {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3030;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  &__wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  &__overview {
    figure {
      max-width: 700px;
      display: block;

      margin: 50px auto 0;
    }
    img {
      width: 100%;

      display: block;

      object-fit: cover;
    }
  }

  &__thumbnails {
    width: 80%;
    height: 100px;

    margin: 0 auto;

    display: flex;
    justify-content: center;

    overflow-x: auto;
  }

  &__thumbnail {
    flex: 0 0 100px;
    height: 100%;

    display: block;
    margin: 0 5px;

    img {
      width: 100%;
      height: 100%;

      display: block;

      object-fit: cover;
    }
  }

  &__nav {
    position: absolute;
    right: 10px;
    top: 10px;

    & > a + a {
      margin-left: 20px;
    }
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    a {
      width: 50px;
      height: 50px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      background: #7e48f5;
    }
  }

  &__prev {
    left: 30px;
  }

  &__next {
    right: 30px;
  }
}
</style>
