const { mapMutations } = require('vuex');
const config = require('@/config');

const mixin = {
  methods: {
    ...mapMutations(['SET_LOCAL_USER']),
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
    /* ALERTS */
    alert: function(type, message) {
      this.$alertify[type](message);
    }
  }
};

module.exports = mixin;
