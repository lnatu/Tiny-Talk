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
      <div class="d-flex align-items-center justify-content-between mt-1">
        <div class="dropdown mr-2">
          <button class="dropdown-button">All chats</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">All chats</a>
            <a class="dropdown-item" href="#">Friends</a>
            <a class="dropdown-item" href="#">Groups</a>
            <a class="dropdown-item" href="#">Unread</a>
            <a class="dropdown-item" href="#">Archived</a>
          </div>
        </div>
        <form class="search-form" action="#">
          <div class="input-group">
            <input
              type="text"
              class="form-control border-right-0"
              placeholder="Search users..."
            />
            <div class="input-group-append">
              <div
                class="input-group-text border-left-0 bg-transparent cursor-pointer"
              >
                <svg class="">
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-search"
                  />
                </svg>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <ContactList />
  </aside>
</template>

<script>
import ContactList from '@/components/contact/ContactList';

export default {
  name: 'AppSidebar',
  components: {
    ContactList
  }
};
</script>

<style lang="scss">
@import '@/assets/scss/components/_sidebar';
</style>
