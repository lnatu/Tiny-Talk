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
                <input
                  v-model="accountInfo.firstName"
                  id="firstName"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-6">
                <label for="lastName">Last name</label>
                <input
                  v-model="accountInfo.lastName"
                  id="lastName"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="mobile">Mobile number</label>
                <input
                  v-model="accountInfo.phone"
                  id="mobile"
                  class="form-control"
                  type="text"
                />
              </div>
              <div class="form-group col-6">
                <label for="birthday">Birthday</label>
                <input
                  v-model="accountInfo.birthday"
                  id="birthday"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="email">Email</label>
                <input
                  v-model="accountInfo.email"
                  id="email"
                  class="form-control"
                  type="email"
                  disabled
                />
              </div>
              <div class="form-group col-6">
                <label for="website">Website</label>
                <input
                  v-model="accountInfo.website"
                  id="website"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="gender">Gender</label>
                <select
                  v-model="accountInfo.gender"
                  name="gender"
                  id="gender"
                  class="form-control"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="form-group col-6">
                <label for="address">Address</label>
                <input
                  v-model="accountInfo.address"
                  id="address"
                  class="form-control"
                  type="text"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="tt-card-footer text-right">
          <button class="btn btn-danger mr-1" type="button">Cancel</button>
          <button
            class="btn btn-submit"
            type="button"
            @click="updateAccountInfoAction"
          >
            Save changes
          </button>
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
      <div class="tt-card mt-2">
        <div class="tt-card-header line-height-1">
          <h5 class="tt-card-title mb-sm">Password</h5>
          <p class="tt-card-sub-title">Manage your password</p>
        </div>
        <div class="tt-card-body">
          <form action="#">
            <div class="form-row">
              <div class="form-group col-12">
                <label for="currentPassword">Current password</label>
                <input
                  v-model="accountPassword.currentPassword"
                  id="currentPassword"
                  class="form-control"
                  type="password"
                  @input="
                    triggerFieldValidation('accountPassword', 'currentPassword')
                  "
                />
                <error
                  :vuelidate="$v"
                  :validateObj="'accountPassword'"
                  :validateKey="'currentPassword'"
                  :validateName="'Password'"
                  :validateType="['required']"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-6">
                <label for="newPassword">New password</label>
                <input
                  v-model="accountPassword.newPassword"
                  id="newPassword"
                  class="form-control"
                  type="password"
                  @input="
                    triggerFieldValidation('accountPassword', 'newPassword')
                  "
                />
                <error
                  :vuelidate="$v"
                  :validateObj="'accountPassword'"
                  :validateKey="'newPassword'"
                  :validateName="'Password'"
                  :validateType="['required', 'minLength']"
                />
              </div>
              <div class="form-group col-6">
                <label for="newPasswordConfirm">Confirm new password</label>
                <input
                  v-model="accountPassword.confirmPassword"
                  id="newPasswordConfirm"
                  class="form-control"
                  type="password"
                  @input="
                    triggerFieldValidation('accountPassword', 'confirmPassword')
                  "
                />
                <error
                  :vuelidate="$v"
                  :validateObj="'accountPassword'"
                  :validateKey="'confirmPassword'"
                  :validateName="'Password'"
                  :validateType="['required', 'sameAsPassword']"
                />
              </div>
            </div>
          </form>
        </div>
        <div class="tt-card-footer text-right">
          <button class="btn btn-danger mr-1" type="button">Cancel</button>
          <button
            class="btn btn-submit"
            type="button"
            :disabled="isFormValid('accountPassword')"
            @click="updatePasswordAction"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import Error from '@/components/error/Error';
import mixin from '@/mixins/global';

export default {
  name: 'ProfileSetting',
  mixins: [mixin],
  components: {
    Error
  },
  computed: {
    ...mapGetters(['GET_LOCAL_USER'])
  },
  data() {
    return {
      accountInfo: {},
      accountPassword: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    };
  },
  validations: {
    accountPassword: {
      currentPassword: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('newPassword')
      }
    }
  },
  methods: {
    ...mapMutations(['toggleLoader', 'SET_LOCAL_USER']),
    ...mapActions(['updateAccountInfo', 'updatePassword']),
    async updateAccountInfoAction() {
      this.toggleLoader(true);
      try {
        const res = await this.updateAccountInfo(this.accountInfo);
        this.saveUser(res.data.data.user);
        this.toggleLoader(false);
        this.alert('success', 'Update account information successful!');
      } catch (err) {
        this.alert('error', err.response.data.message);
      }
    },
    async updatePasswordAction() {
      this.toggleLoader(true);
      try {
        const res = await this.updatePassword(this.accountPassword);
        console.log(res);
        this.toggleLoader(false);
        this.alert('success', 'Update password successfully');
      } catch (err) {
        this.alert('error', err.response.data.message);
      }
    }
  },
  mounted() {
    this.GET_LOCAL_USER.birthday = this.formatDate(
      this.GET_LOCAL_USER.birthday
    );
    this.accountInfo = this.filterObj(
      { ...this.GET_LOCAL_USER },
      'firstName',
      'lastName',
      'phone',
      'birthday',
      'email',
      'website',
      'gender',
      'address'
    );
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/profile/_profileSetting';
</style>
