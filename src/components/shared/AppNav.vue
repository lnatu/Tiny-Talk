<template>
  <div class="navigation">
    <a class="logo__button" href="#">
      <svg class="logo__icon">
        <use xlink:href="@/assets/img/icons/sprites.svg#icon-clockify"></use>
      </svg>
    </a>
    <ul class="navigation-list">
      <li class="navigation-item">
        <router-link class="navigation-link" active-class="active" to="/" exact>
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-comments-o" />
          </svg>
        </router-link>
      </li>
      <li class="navigation-item">
        <router-link
          class="navigation-link"
          active-class="active"
          to="/a"
          exact
        >
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-phone-call" />
          </svg>
        </router-link>
      </li>
      <li class="navigation-item">
        <router-link
          class="navigation-link"
          active-class="active"
          to="/b"
          exact
        >
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-users" />
          </svg>
        </router-link>
      </li>
      <li class="navigation-item">
        <router-link
          class="navigation-link"
          active-class="active"
          :to="{ name: 'Profile' }"
          exact
        >
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-settings" />
          </svg>
        </router-link>
      </li>
      <li class="navigation-item">
        <a class="navigation-link" href="#" @click.prevent="logoutAction">
          <svg class="navigation-item__icon">
            <use xlink:href="@/assets/img/icons/sprites.svg#icon-switch" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { localKeys } from '@/config';

export default {
  name: 'AppNav',
  computed: {
    ...mapGetters(['SHOW_LOADER'])
  },
  methods: {
    ...mapMutations(['toggleLoader', 'SET_LOCAL_USER']),
    ...mapActions(['logout']),
    async logoutAction() {
      this.toggleLoader(true);
      try {
        await this.logout();
        this.SET_LOCAL_USER('');
        localStorage.removeItem(localKeys.USER_KEY);
        localStorage.removeItem(localKeys.NOTIFICATIONS_KEY);
        localStorage.removeItem(localKeys.CONVERSATIONS_KEY);
        localStorage.removeItem(localKeys.CONVERSATION_KEY);
        location.reload();
        this.$socket.emit('user-logout');
        this.toggleLoader(false);
      } catch {
        this.toggleLoader(false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/_navigation';
</style>
