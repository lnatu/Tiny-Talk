<template>
  <div
    class="activate w-100 h-max d-flex align-items-center justify-content-center"
  >
    <div
      class="activate-card text-center d-flex flex-column justify-content-between"
    >
      <div>
        <p style="font-size: 30px;">😍😍😍</p>
        <p class="text-lg">Welcome to Tiny Talk</p>
        <p class="text-success">Your account has been activated</p>
      </div>
      <div>
        <a class="btn btn-activate" href="#">Sign in</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ActivateAccount',
  methods: {
    ...mapActions(['activateAccount']),
    async activateAccountAction() {
      try {
        await this.activateAccount(this.$route.params.token);
      } catch (err) {
        console.log(err.response.data.message);
      }
    }
  },
  created() {
    this.activateAccountAction();
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/pages/activate';
</style>
