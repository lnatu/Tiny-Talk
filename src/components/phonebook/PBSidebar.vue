<template>
  <aside class="pb-sidebar bg-light-2">
    <div class="section-header line-height-1">
      <h5 class="title mb-1">Contacts</h5>
      <p>Find & Connect</p>
    </div>
    <div class="pb-side-body hide-scrollbar" v-if="GET_CONTACTS.length > 0">
      <div class="pb-box" v-for="pb in phonebook" :key="pb.group">
        <div class="pb-alphabet text-danger">{{ pb.group }}</div>
        <a
          class="pb-link d-block"
          href="#"
          v-for="c in pb.contacts"
          :key="c.contact._id"
        >
          <figure class="pb-figure">
            <div class="pb-avatar">
              <img
                class="d-block"
                :src="require(`@/assets/img/users/${c.contact.avatar}`)"
                alt="girl"
              />
            </div>
            <figcaption class="pb-caption">
              <div class="pb-caption-name">
                <h3>{{ c.contact.fullName }}</h3>
              </div>
              <div class="pb-caption-address">
                <svg class="pb-caption-icon">
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-mapmarker"
                  />
                </svg>
                <span>{{ c.contact.address ? c.contact.address : '---' }}</span>
              </div>
            </figcaption>
          </figure>
        </a>
      </div>
      <!-- <div class="pb-box">
        <div class="pb-alphabet">B</div>
        <a class="pb-link d-block" href="#">
          <figure class="pb-figure">
            <div class="pb-avatar">
              <img
                class="d-block"
                src="@/assets/img/users/girl-2.png"
                alt="girl"
              />
            </div>
            <figcaption class="pb-caption">
              <div class="pb-caption-name">
                <h3>Erza Scarlet</h3>
              </div>
              <div class="pb-caption-address">
                <svg class="pb-caption-icon">
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-mapmarker"
                  />
                </svg>
                <span>San Fransisco, CA</span>
              </div>
            </figcaption>
          </figure>
        </a>
        <a class="pb-link d-block" href="#">
          <figure class="pb-figure">
            <div class="pb-avatar">
              <img
                class="d-block"
                src="@/assets/img/users/girl-2.png"
                alt="girl"
              />
            </div>
            <figcaption class="pb-caption">
              <div class="pb-caption-name">
                <h3>Erza Scarlet</h3>
              </div>
              <div class="pb-caption-address">
                <svg class="pb-caption-icon">
                  <use
                    xlink:href="@/assets/img/icons/sprites.svg#icon-mapmarker"
                  />
                </svg>
                <span>San Fransisco, CA</span>
              </div>
            </figcaption>
          </figure>
        </a>
      </div> -->
    </div>
    <content-placeholder v-else />
  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ContentPlaceholder from '@/components/loading/ContentPlaceholder';

export default {
  name: 'PBSidebar',
  components: {
    ContentPlaceholder
  },
  computed: {
    ...mapGetters(['GET_CONTACTS']),
    phonebook() {
      return this.GET_CONTACTS.reduce((r, e) => {
        // get first letter of name of current element
        let group = e.contact.firstName[0];

        // if there is no property in accumulator with this letter create it
        if (!r[group]) {
          r[group] = { group, contacts: [e] };
        } else {
          // if there is push current element to children array for that letter
          r[group].contacts.push(e);
        }

        // return accumulator
        return r;
      }, {});
    }
  },
  methods: {
    ...mapActions(['getMyContacts'])
  },
  created() {
    console.log(this.phonebook);
    this.getMyContacts();
  }
};
</script>

<style scoped></style>
