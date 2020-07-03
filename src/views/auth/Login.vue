<template>
  <section class="login d-flex h-max">
    <div class="login-left h-100"></div>
    <div class="login-right h-100 d-flex align-items-center">
      <div class="login-form w-100">
        <div class="text-center">
          <h1 class="mb-5 text-white">Sign in to Tiny Talk</h1>
          <a
            class="d-inline-flex align-items-center social-opt-btn text-dec-none"
            href="#"
          >
            <img
              class="brand-sm"
              src="@/assets/img/icons/google.svg"
              alt="google brand"
            />
            <span class="ml-5 mr-5">Sign in with Google</span>
          </a>
        </div>
        <form class="w-50 mx-auto mt-5" action="#">
          <div class="form-group">
            <input
              type="email"
              class="form-control login-input"
              placeholder="Email"
            />
          </div>
          <div class="form-group mt-2">
            <input
              type="password"
              class="form-control login-input"
              placeholder="Password"
            />
          </div>
          <a class="login-submit mt-5" href="#">Sign in</a>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/init';
@import '@/assets/scss/pages/login';
</style>
