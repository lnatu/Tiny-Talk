<template>
  <li class="contact-item">
    <a href="#" class="contact-link">
      <div class="contact-avatar online mr-2">
        <img
          class="contact-avatar__pic"
          :src="require(`@/assets/img/users/${contact.contactId.avatar}`)"
          alt="girl"
        />
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <h6 class="contact-name">{{ contact.contactId.fullName }}</h6>
          <div class="chat-time">Just now</div>
        </div>
        <div class="contact-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: 'ContactItem',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log(this.contact);
  }
};
</script>
