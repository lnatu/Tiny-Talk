<template>
  <div class="user-search-result">
    <div v-if="!users">
      <h3 class="mb-3 line-height-1">Searching...</h3>
    </div>
    <div v-else>
      <div>
        <h3 v-if="users.length > 0" class="mb-3 line-height-1">
          Search result for {{ $route.query.q }}
        </h3>
        <h3 v-else class="mb-3 line-height-1">
          No result for {{ $route.query.q }}
        </h3>
      </div>
      <div v-for="user in users" :key="user._id" class="user-card">
        <figure class="user-card__figure d-flex align-items-center">
          <a href="#" class="user-card__avatar d-block">
            <img
              :src="require(`@/assets/img/users/${user.avatar}`)"
              alt="girl name"
            />
          </a>
          <figcaption>
            <a href="#" class="line-height-1 ml-2 fw-md">{{ user.fullName }}</a>
          </figcaption>
        </figure>
        <div class="user-card__cta">
          <a class="user-card__cta-b" href="#" @click.prevent="addToContact">
            <svg class="icon-svg icon-svg--dark icon-svg--2x">
              <use
                xlink:href="@/assets/img/icons/sprites.svg#icon-user-plus-2"
              ></use>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  name: 'SearchResult',
  data() {
    return {
      users: null
    };
  },
  methods: {
    ...mapMutations(['toggleLoader']),
    ...mapActions(['findAllUser']),
    addToContact() {
      alert('Add to contact');
    },
    async performSearchFromQuery() {
      this.toggleLoader(true);
      try {
        const res = await this.findAllUser(this.$route.query);
        this.users = res.data.data.data;
        this.toggleLoader(false);
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  created() {
    this.performSearchFromQuery();
  }
};
</script>

<style scoped></style>
