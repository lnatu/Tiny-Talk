<template>
  <aside class="sidebar h-100">
    <div class="sidebar-header">
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="title">Chats</h5>
        <ul
          class="sidebar-header__nav list-style-none d-flex align-items-center"
        >
          <li class="mr-2">
            <a href="#">
              <svg class="">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-bell-o" />
              </svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg class="">
                <use
                  xlink:href="@/assets/img/icons/sprites.svg#icon-more-vert"
                />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style lang="scss">
@import '@/assets/scss/components/_sidebar';
</style>
