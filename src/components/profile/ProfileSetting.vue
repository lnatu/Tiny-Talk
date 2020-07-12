<template>
  <div class="profile-setting">
    <div class="section-header line-height-1">
      <h5 class="title mb-1">Settings</h5>
      <p>Update Personal Information & Settings</p>
    </div>
    <div class="section-body">
      <div class="tt-card">
        <div class="tt-card-header line-height-1">
          <h5 class="tt-card-title mb-sm">Account</h5>
          <p class="tt-card-sub-title">Update personal & contact information</p>
        </div>
        <div class="tt-card-body">
          <form action="#">
            <div class="form-row">
              <div class="form-group col-6">
                <label for="firstName">First name</label>
                <input id="firstName" class="form-control" type="text" />
              </div>
              <div class="form-group col-6">
                <label for="lastName">Last name</label>
                <input id="lastName" class="form-control" type="text" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="mobile">Mobile number</label>
                <input id="mobile" class="form-control" type="text" />
              </div>
              <div class="form-group col-6">
                <label for="birthday">Birthday</label>
                <input id="birthday" class="form-control" type="date" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="email">Email</label>
                <input id="email" class="form-control" type="email" />
              </div>
              <div class="form-group col-6">
                <label for="website">Website</label>
                <input id="website" class="form-control" type="text" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-12">
                <label for="address">Address</label>
                <input id="address" class="form-control" type="text" />
              </div>
            </div>
          </form>
        </div>
        <div class="tt-card-footer">
          <p>test</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileSetting'
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/profile/_profileSetting';
</style>
