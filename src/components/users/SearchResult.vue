<template>
  <div class="user-search-result">
    <div v-if="Object.keys(users).length === 0 && users.constructor === Object">
      <h3 class="mb-3 line-height-1">Searching...</h3>
    </div>
    <div v-else>
      <div>
        <h3 v-if="Object.keys(users).length > 0" class="mb-3 line-height-1">
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
          <a
            v-if="!user.friendRequestStatus"
            class="user-card__cta-b"
            href="#"
            @click.prevent="addContactAction(user._id)"
          >
            <svg class="icon-svg icon-svg--dark icon-svg--2x">
              <use
                xlink:href="@/assets/img/icons/sprites.svg#icon-user-plus-2"
              ></use>
            </svg>
          </a>
          <a
            v-else
            class="user-card__cta-b"
            href="#"
            @click.prevent="cancelAddContactAction(user._id)"
          >
            <svg class="icon-svg icon-svg--danger icon-svg--2x">
              <use
                xlink:href="@/assets/img/icons/sprites.svg#icon-user-times"
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
      users: {}
    };
  },
  methods: {
    ...mapMutations(['toggleLoader']),
    ...mapActions(['findAllUser', 'addContact', 'cancelAddContact']),
    async performSearchFromQuery() {
      this.toggleLoader(true);
      try {
        const res = await this.findAllUser(this.$route.query);
        const usersData = res.data.data.data;
        if (usersData.length > 0) {
          usersData.forEach(item => {
            this.$set(this.users, item._id, item);
          });
        }
        this.toggleLoader(false);
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    },
    async addContactAction(contactId) {
      this.toggleLoader(true);
      try {
        const res = await this.addContact({ contactId });
        if (res.status === 200) {
          this.$set(this.users[contactId], 'friendRequestStatus', true);
        }
        this.toggleLoader(false);
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    },
    async cancelAddContactAction(contactId) {
      this.toggleLoader(true);
      try {
        const res = await this.cancelAddContact({ contactId });
        if (res.status === 204) {
          this.$set(this.users[contactId], 'friendRequestStatus', false);
        }
        this.toggleLoader(false);
      } catch (err) {
        console.log(err);
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
