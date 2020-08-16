<template>
  <div class="user-search-result">
    <div v-if="searching">
      <h3 class="mb-3 line-height-1">Searching...</h3>
    </div>
    <div v-else>
      <div>
        <h3 v-if="Object.keys(GET_USERS).length > 0" class="mb-3 line-height-1">
          Search result for {{ $route.query.q }}
        </h3>
        <h3 v-else class="mb-3 line-height-1">
          No result for {{ $route.query.q }}
        </h3>
      </div>
      <div v-for="user in GET_USERS" :key="user._id" class="user-card">
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
          <spinner v-if="SPINNER_SHOW && SPINNER_SHOW[user._id]" />
          <a
            v-if="!user.friendRequest"
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
            v-if="user.friendRequest && user.friendRequest.cancel"
            class="user-card__cta-b"
            href="#"
            @click.prevent="
              cancelAddContactAction({ contactId: user._id, self: true })
            "
          >
            <svg class="icon-svg icon-svg--danger icon-svg--2x">
              <use
                xlink:href="@/assets/img/icons/sprites.svg#icon-user-times"
              ></use>
            </svg>
          </a>
          <div v-if="user.friendRequest && user.friendRequest.accept">
            <button class="btn btn-submit">Accept</button>
            <button
              class="btn btn-danger ml-1"
              @click.prevent="cancelAddContactAction({ contactId: user._id })"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Spinner from '@/components/loading/Spinner';
import mixin from '@/mixins/global';

export default {
  name: 'SearchResult',
  components: {
    Spinner
  },
  computed: {
    ...mapGetters(['GET_LOCAL_USER', 'GET_USERS'])
  },
  data() {
    return {
      searching: true
    };
  },
  mixins: [mixin],
  methods: {
    ...mapMutations(['toggleLoader', 'SET_USERS', 'UPDATE_USERS_KEY']),
    ...mapActions(['findContact', 'addContact', 'cancelAddContact']),
    async performSearchFromQuery() {
      this.toggleLoader(true);
      this.SET_USERS({});
      try {
        const res = await this.findContact(this.$route.query);
        const usersData = res.data.data.data;
        if (usersData.length > 0) {
          usersData.forEach(item => {
            this.$set(this.GET_USERS, item._id, item);
            this.$set(this.SPINNER_SHOW, item._id, false);
          });
        }
        this.searching = false;
        this.toggleLoader(false);
      } catch (err) {
        console.log(err);
        console.log(err.response);
        this.searching = false;
      }
    },
    async addContactAction(contactId) {
      this.UPDATE_USERS_KEY({
        userId: contactId,
        key: 'friendRequest',
        value: { holder: true }
      });
      this.SPINNER_SHOW[contactId] = true;
      try {
        const res = await this.addContact({ contactId });
        const notification = res.data.data.notification;

        this.SPINNER_SHOW[contactId] = false;

        this.UPDATE_USERS_KEY({
          userId: contactId,
          key: 'friendRequest',
          value: { cancel: true }
        });

        this.$socket.emit('friend-request-on', {
          contactId,
          notification
        });
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
