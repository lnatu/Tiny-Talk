<template>
  <div class="sidebar-header">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="title">Chats</h5>
      <ul class="sidebar-header__nav list-style-none d-flex align-items-center">
        <li class="mr-2">
          <a
            class="modal-toggle position-relative"
            data-toggle="notificationModal"
            href="#"
          >
            <svg class="">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-bell-o" />
            </svg>
            <span v-if="GET_TOTAL_NOTIFICATIONS > 0" class="float-label">{{
              GET_TOTAL_NOTIFICATIONS
            }}</span>
          </a>
        </li>
        <li>
          <a href="#">
            <svg class="">
              <use xlink:href="@/assets/img/icons/sprites.svg#icon-more-vert" />
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
      <form class="search-form" action="#" @submit.prevent="performSearch">
        <div class="input-group">
          <input
            v-model="searchKeyword"
            type="text"
            class="form-control border-right-0"
            placeholder="Search users..."
          />
          <div class="input-group-append">
            <div
              class="input-group-text border-left-0 bg-transparent cursor-pointer"
              @click.enter="performSearch"
            >
              <svg class="">
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-search" />
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppSidebarHeader',
  computed: {
    ...mapGetters(['GET_TOTAL_NOTIFICATIONS'])
  },
  data() {
    return {
      searchKeyword: ''
    };
  },
  methods: {
    ...mapActions(['getMyContacts', 'getMyConversations']),
    performSearch() {
      if (!this.searchKeyword) {
        return;
      }
      this.$router.push({
        name: 'SearchResult',
        query: { q: this.searchKeyword }
      });
    }
  }
};
</script>

<style scoped></style>
