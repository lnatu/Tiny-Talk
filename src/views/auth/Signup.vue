<template>
  <div class="d-flex w-100 h-max">
    <div
      class="signup-left h-100 d-flex align-items-center justify-content-center position-relative"
    >
      <div class="signup-form w-50">
        <div v-if="!signUpInfo.success.status">
          <div class="signup-header">
            <h1 class="signup-title line-height-1">Sign up to Tiny Talk</h1>
            <a
              class="social-opt-btn d-inline-flex align-items-center mt-4"
              href="#"
            >
              <img src="@/assets/img/icons/google.svg" alt="google brand" />
              <span class="ml-3 mr-3">Sign up with Google</span>
            </a>
          </div>
          <div class="other-opt w-100 mt-4 position-relative">
            <span>OR</span>
          </div>
          <form class="signup-form-form mt-4" action="">
            <div class="d-flex justify-content-between mx-sm-reverse">
              <div class="form-group flex-50 px-sm">
                <input
                  v-model="signUpObj.firstName"
                  @input="$v.signUpObj.firstName.$touch()"
                  type="text"
                  class="form-control"
                  placeholder="First name"
                />
                <error
                  :vuelidate="$v"
                  :validateObj="'signUpObj'"
                  :validateKey="'firstName'"
                  :validateType="['required']"
                />
              </div>
              <div class="form-group flex-50 px-sm">
                <input
                  v-model="signUpObj.lastName"
                  @input="$v.signUpObj.lastName.$touch()"
                  type="text"
                  class="form-control"
                  placeholder="Last name"
                />
                <error
                  :vuelidate="$v"
                  :validateObj="'signUpObj'"
                  :validateKey="'lastName'"
                  :validateType="['required']"
                />
              </div>
            </div>
            <div class="form-group flex-50 mt-2">
              <input
                v-model="signUpObj.email"
                @input="$v.signUpObj.email.$touch()"
                type="email"
                class="form-control"
                placeholder="Email address"
              />
              <error
                :vuelidate="$v"
                :validateObj="'signUpObj'"
                :validateKey="'email'"
                :validateType="['required', 'email']"
              />
            </div>
            <div class="form-group flex-50 mt-2">
              <input
                v-model="signUpObj.password"
                @input="$v.signUpObj.password.$touch()"
                type="password"
                class="form-control"
                placeholder="Password"
              />
              <error
                :vuelidate="$v"
                :validateObj="'signUpObj'"
                :validateKey="'password'"
                :validateType="['required']"
              />
            </div>
            <div class="form-group flex-50 mt-2">
              <button
                type="button"
                class="btn btn-submit px-2"
                :disabled="isFormValid"
                @click="signUpAction(signUpObj)"
              >
                Create account
              </button>
            </div>
          </form>
          <p v-if="signUpInfo.error.status" class="text-danger">
            {{ signUpInfo.error.message }}
          </p>
        </div>
        <div v-else class="text-success">
          {{ signUpInfo.success.message }}
        </div>
      </div>
      <p class="link-to-signin line-height-1">
        <span>Already a member?</span>
        <router-link :to="{ name: 'Login' }" class="ml-1">
          Sign in
        </router-link>
      </p>
    </div>
    <div class="signup-right h-100"></div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapMutations, mapActions } from 'vuex';
import Error from '@/components/error/Error';

export default {
  name: 'SignupPage',
  components: {
    Error
  },
  computed: {
    isFormValid() {
      return this.$v.signUpObj.$invalid;
    }
  },
  data() {
    return {
      signUpObj: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      signUpInfo: {
        success: {
          message:
            'Your account has been created. Please check your email to activate your account',
          status: false
        },
        error: {
          message: '',
          status: false
        }
      }
    };
  },
  validations: {
    signUpObj: {
      firstName: {
        required
      },
      lastName: {
        required
      },
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
    ...mapMutations(['toggleLoader']),
    ...mapActions(['signUp']),
    async signUpAction() {
      try {
        this.toggleLoader(true);
        await this.signUp(this.signUpObj);
        this.toggleLoader(false);
        this.signUpInfo.success.status = !this.signUpInfo.success.status;
      } catch (err) {
        this.toggleLoader(false);
        this.signUpInfo.error.status = !this.signUpInfo.error.status;
        this.signUpInfo.error.message = err.response.data.message;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/signup';
</style>
