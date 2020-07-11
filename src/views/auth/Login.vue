<template>
  <section class="login d-flex w-100 h-max">
    <div class="login-left h-100"></div>
    <div class="login-right h-100 d-flex align-items-center">
      <div class="login-form w-100">
        <div class="text-center">
          <h1 class="mb-5 text-white">Sign in to Tiny Talk</h1>
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
        <form class="w-50 mx-auto mt-5" action="#">
          <div class="form-group">
            <input
              v-model="userInfo.email"
              type="email"
              class="form-control login-input"
              placeholder="Email"
            />
          </div>
          <div class="form-group mt-2">
            <input
              v-model="userInfo.password"
              type="password"
              class="form-control login-input"
              placeholder="Password"
            />
            <div v-if="GET_GLOBAL_ERROR_MESSAGE" class="text-danger">
              {{ GET_GLOBAL_ERROR_MESSAGE }}
            </div>
          </div>
          <a class="login-submit mt-3" href="#" @click.prevent="loginAction">
            Sign in
          </a>
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
    ...mapGetters(['GET_GLOBAL_ERROR_MESSAGE'])
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
    ...mapMutations(['toggleLoader', 'SET_LOCAL_USER']),
    ...mapActions(['login']),
    async loginAction() {
      this.toggleLoader(true);
      try {
        const res = await this.login(this.userInfo);
        const { user } = res.data.data;
        this.SET_LOCAL_USER(user);
        localStorage.setItem(localKeys.USER_KEY, JSON.stringify(user));
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
