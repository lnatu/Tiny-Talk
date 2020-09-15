<template>
  <section class="login d-flex w-100 h-100">
    <div class="login-left h-100" v-if="!isMobile"></div>
    <div class="login-right mt-auto d-flex align-items-center">
      <div class="login-form w-100">
        <div class="text-center mb-3" v-if="isMobile">
          <img
            src="@/assets/img/bg/login-header.jpg"
            width="100px"
            height="100px"
            class="rounded"
            alt="mail icon"
          />
        </div>
        <div class="text-center">
          <h1 class="mb-3 line-height-1 text-theme">Sign in to Tiny Talk</h1>
          <a
            class="d-inline-flex align-items-center social-opt-btn text-dec-none w-50"
            href="#"
          >
            <img
              class="brand-sm"
              src="@/assets/img/icons/google.svg"
              alt="google brand"
            />
            <span class="flex-1">Sign in with Google</span>
          </a>
        </div>
        <form class="login-form__form w-50 mx-auto mt-5" action="#">
          <div class="form-group" :class="{ active: inputActive('email') }">
            <label for="email" :class="{ active: inputActive('email') }">
              Email
            </label>
            <div class="login-form__icon">
              <svg
                class="icon-svg icon-svg--2x icon-svg--theme"
                :class="{ 'icon-svg--theme': inputActive('email') }"
              >
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-user-m" />
              </svg>
            </div>
            <input
              v-model="userInfo.email"
              type="email"
              id="email"
              class="form-control login-input"
            />
          </div>
          <div
            class="form-group mt-5"
            :class="{ active: inputActive('password') }"
          >
            <label for="password" :class="{ active: inputActive('password') }">
              Password
            </label>
            <div class="login-form__icon">
              <svg
                class="icon-svg icon-svg--2x icon-svg--theme"
                :class="{ 'icon-svg--theme': inputActive('password') }"
              >
                <use xlink:href="@/assets/img/icons/sprites.svg#icon-lock" />
              </svg>
            </div>
            <input
              v-model="userInfo.password"
              type="password"
              id="password"
              class="form-control login-input"
            />
          </div>
          <div
            v-if="GET_GLOBAL_ERROR_MESSAGE"
            class="err-login text-white bg-danger mt-1 pl-1"
          >
            {{ GET_GLOBAL_ERROR_MESSAGE }}
          </div>
          <div class="text-right">
            <a class="login-submit mt-3" href="#" @click.prevent="loginAction">
              <span class="text-dark">Sign in</span>
              <div class="login-submit__icon">
                <svg class="icon-svg icon-svg--2x icon-svg--white">
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-arrow-up-right"
                  />
                </svg>
              </div>
            </a>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { localKeys } from '@/config';

export default {
  name: 'LoginPage',
  computed: {
    ...mapGetters(['GET_GLOBAL_ERROR_MESSAGE']),
    inputActive() {
      return inputName => this.userInfo[inputName] !== '';
    }
  },
  data() {
    return {
      userInfo: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    ...mapMutations([
      'toggleLoader',
      'SET_LOCAL_USER',
      'SET_HOME_NOTIFICATIONS'
    ]),
    ...mapActions(['login']),
    async loginAction() {
      this.toggleLoader(true);
      try {
        const res = await this.login(this.userInfo);
        const { user, notifications } = res.data.data;
        const notificationsObj = {};
        notifications.forEach(item => {
          notificationsObj[item._id] = item;
        });
        this.SET_LOCAL_USER(user);
        this.SET_HOME_NOTIFICATIONS(notificationsObj);
        localStorage.setItem(localKeys.USER_KEY, JSON.stringify(user));
        localStorage.setItem(
          localKeys.NOTIFICATIONS_KEY,
          JSON.stringify(notificationsObj)
        );
        this.toggleLoader(false);
        this.$router.push({ name: 'Home' });
      } catch {
        this.toggleLoader(false);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/init';
@import '@/assets/scss/pages/login';
</style>
