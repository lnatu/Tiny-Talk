<template>
  <div class="text-center bg-light-2 h-100">
    <ul class="contact-list list-style-none overflow-hidden">
      <li class="contact-item loader" v-for="i in 7" :key="i">
        <ContentLoader :height="'92'" :primaryColor="'#C4C2C8'">
          <rect x="70" y="30%" rx="4" ry="4" width="150" height="10" />
          <rect x="340" y="30%" rx="4" ry="4" width="50" height="10" />
          <rect x="70" y="55%" rx="3" ry="3" width="320" height="10" />
          <circle cx="30" cy="50%" r="25" />
        </ContentLoader>
      </li>
    </ul>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader';

export default {
  name: 'ContentPlaceholder',
  components: {
    ContentLoader
  }
};
</script>
