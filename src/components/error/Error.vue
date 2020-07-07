<template>
  <div class="line-height-1" v-if="vuelidate[validateObj][validateKey].$error">
    <div v-for="item in validateType" :key="item">
      <span
        v-if="!vuelidate[validateObj][validateKey][item] && item === 'email'"
      >
        Please enter a valid {{ item }}
      </span>
      <span
        v-if="!vuelidate[validateObj][validateKey][item] && item === 'required'"
      >
        {{ validateKey.charAt(0).toUpperCase() + validateKey.slice(1) }} is
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    vuelidate: {
      type: Object,
      required: true
    },
    validateObj: {
      type: String,
      required: true
    },
    validateKey: {
      type: String,
      required: true
    },
    validateType: {
      type: Array,
      required: true
    }
  },
  name: 'Error'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/abstract/_variables';
span {
  color: $danger-color;
  font-size: 1.2rem;
}
</style>
