const { mapGetters, mapMutations, mapActions } = require('vuex');
const config = require('@/config');

const mixin = {
  computed: {
    ...mapGetters(['GET_USERS', 'GET_HOME_NOTIFICATIONS']),
    isFormValid() {
      return validObj => this.$v[validObj].$invalid;
    }
  },
  data() {
    return {
      validObj: ''
    };
  },
  methods: {
    ...mapMutations([
      'toggleLoader',
      'SET_LOCAL_USER',
      'DECREASE_HOME_TOTAL_NOTIFICATIONS',
      'REMOVE_HOME_NOTIFICATIONS'
    ]),
    ...mapActions(['cancelAddContact']),
    formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      let year = d.getFullYear();

      if (month.length < 2) {
        month = '0' + month;
      }
      if (day.length < 2) {
        day = '0' + day;
      }

      return [year, month, day].join('-');
    },
    filterObj(obj, ...allowedFields) {
      const newObj = {};
      Object.keys(obj).forEach(key => {
        if (allowedFields.includes(key)) {
          newObj[key] = obj[key];
        }
      });

      return newObj;
    },
    saveUser(userObj) {
      this.SET_LOCAL_USER(userObj);
      localStorage.setItem(config.localKeys.USER_KEY, JSON.stringify(userObj));
    },
    triggerFieldValidation(obj, key) {
      this.$v[obj][key].$touch();
    },
    /* ALERTS */
    alert: function(type, message) {
      this.$alertify[type](message);
    },
    /* FRIEND REQUESTS */
    async cancelAddContactAction(data) {
      this.toggleLoader(true);
      try {
        const res = await this.cancelAddContact({ contactId: data.contactId });

        if (this.GET_HOME_NOTIFICATIONS[data.id]) {
          this.REMOVE_HOME_NOTIFICATIONS({ _id: data.id });
        }

        if (this.GET_USERS[data.contactId]) {
          this.$set(this.GET_USERS[data.contactId], 'contact', null);
        }

        this.$socket.emit('friend-request-off', {
          contactId: data.contactId,
          notificationId: res.data.data.deletedDoc
        });
        this.toggleLoader(false);
      } catch (err) {
        console.log(err);
        console.log(err.response);
      }
    }
  }
};

module.exports = mixin;
