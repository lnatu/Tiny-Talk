<template>
  <div class="profile-setting">
    <div class="section-header line-height-1">
      <h5 class="title mb-1">Settings</h5>
      <p>Update Personal Information & Settings</p>
    </div>
    <div class="section-body hide-scrollbar">
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
        <div class="tt-card-footer text-right">
          <button class="btn btn-danger mr-1" type="button">Cancel</button>
          <button class="btn btn-submit" type="button">Save changes</button>
        </div>
      </div>
      <div class="tt-card mt-2">
        <div class="tt-card-header line-height-1">
          <h5 class="tt-card-title mb-sm">Social network profiles</h5>
          <p class="tt-card-sub-title">Update personal & contact information</p>
        </div>
        <div class="tt-card-body">
          <form action="#">
            <div class="form-row">
              <div class="form-group col-6">
                <label for="facebook">Facebook</label>
                <input id="facebook" class="form-control" type="text" />
              </div>
              <div class="form-group col-6">
                <label for="twitter">Twitter</label>
                <input id="twitter" class="form-control" type="text" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="instagram">Instagram</label>
                <input id="instagram" class="form-control" type="text" />
              </div>
              <div class="form-group col-6">
                <label for="linkedin">Linkedin</label>
                <input id="linkedin" class="form-control" type="text" />
              </div>
            </div>
          </form>
        </div>
        <div class="tt-card-footer text-right">
          <button class="btn btn-danger mr-1" type="button">Cancel</button>
          <button class="btn btn-submit" type="button">Save changes</button>
        </div>
      </div>
      <div class="tt-card mt-2">
        <div class="tt-card-header line-height-1">
          <h5 class="tt-card-title mb-sm">Privacy</h5>
          <p class="tt-card-sub-title">Who can see your personal information</p>
        </div>
        <div class="tt-card-body">
          <ul class="privacy-list list-style-none line-height-1">
            <li
              class="privacy-item d-flex align-items-center justify-content-between"
            >
              <div class="privacy-desc">
                <h4 class="tt-card-title">Email</h4>
                <p class="tt-card-sub-title mt-sm">Make your email public</p>
              </div>
              <div class="privacy-setting">
                <div class="dropdown">
                  <button class="dropdown-button text-danger">Private</button>
                  <div
                    class="dropdown-menu"
                    style="left: -50%; min-width: 12rem;"
                  >
                    <a class="dropdown-item text-success" href="#">Public</a>
                    <a class="dropdown-item text-danger" href="#">Private</a>
                  </div>
                </div>
              </div>
            </li>
            <li
              class="privacy-item d-flex align-items-center justify-content-between"
            >
              <div class="privacy-desc">
                <h4 class="tt-card-title">Phone</h4>
                <p class="tt-card-sub-title mt-sm">
                  Make your phone number public
                </p>
              </div>
              <div class="privacy-setting">
                <div class="dropdown">
                  <button class="dropdown-button text-danger">Private</button>
                  <div
                    class="dropdown-menu"
                    style="left: -50%; min-width: 12rem;"
                  >
                    <a class="dropdown-item text-success" href="#">Public</a>
                    <a class="dropdown-item text-danger" href="#">Private</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="tt-card-footer text-right">
          <button class="btn btn-danger mr-1" type="button">Cancel</button>
          <button class="btn btn-submit" type="button">Save changes</button>
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
