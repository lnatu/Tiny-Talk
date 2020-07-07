<template>
  <section class="login d-flex h-max">
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
              @input="$v.userInfo.email.$touch()"
              type="email"
              class="form-control login-input"
              placeholder="Email"
            />
            <error
              :vuelidate="$v"
              :validateObj="'userInfo'"
              :validateKey="'email'"
              :validateType="['required', 'email']"
            />
          </div>
          <div class="form-group mt-2">
            <input
              v-model="userInfo.password"
              @input="$v.userInfo.password.$touch()"
              type="password"
              class="form-control login-input"
              placeholder="Password"
            />
            <error
              :vuelidate="$v"
              :validateObj="'userInfo'"
              :validateKey="'password'"
              :validateType="['required']"
            />
          </div>
          <a class="login-submit mt-5" href="#" @click.prevent="signUpAction">
            Sign in
          </a>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import Error from '@/components/error/Error';

export default {
  name: 'LoginPage',
  components: {
    Error
  },
  data() {
    return {
      userInfo: {
        email: '',
        password: ''
      }
    };
  },
  validations: {
    userInfo: {
      email: {
        email,
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    ...mapActions(['signUp']),
    async signUpAction() {
      const res = await this.signUp(this.userInfo);
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/init';
@import '@/assets/scss/pages/login';
</style>
