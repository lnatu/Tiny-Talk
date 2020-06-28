<template>
  <li class="contact-item">
    <a href="#" class="contact-link">
      <div class="contact-avatar online mr-2">
        <img
          class="contact-avatar__pic"
          src="@/assets/img/users/girl.png"
          alt="girl"
        />
      </div>
      <div class="contact-content">
        <div class="contact-info">
          <h6 class="contact-name">Demi Lovato</h6>
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
  name: 'ContactItem'
};
</script>

<style scoped></style>
