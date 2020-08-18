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
      validObj: '',
      lastScrollTop: 0,
      showSpinner: false,
      SPINNER_SHOW: {}
    };
  },
  methods: {
    ...mapMutations([
      'toggleLoader',
      'SET_LOCAL_USER',
      'UPDATE_HOME_NOTIFICATION',
      'REMOVE_HOME_NOTIFICATIONS',
      'UPDATE_USERS_KEY',
      'DELETE_USERS_KEY'
    ]),
    ...mapActions(['cancelAddContact', 'acceptContact']),
    /* DATE & TIME */
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
    timeSince(timeStamp) {
      const now = new Date(),
        secondsPast = (now.getTime() - timeStamp) / 1000;
      if (secondsPast < 60) {
        return `${
          parseInt(secondsPast) === 0 ? 1 : parseInt(secondsPast)
        } seconds`;
      }
      if (secondsPast < 3600) {
        return `${parseInt(secondsPast / 60)} minutes`;
      }
      if (secondsPast <= 86400) {
        return `${parseInt(secondsPast / 3600)} hours`;
      }
      if (secondsPast > 86400) {
        const day = timeStamp.getDate();
        const month = timeStamp
          .toDateString()
          .match(/ [a-zA-Z]*/)[0]
          .replace(' ', '');
        const year =
          timeStamp.getFullYear() === now.getFullYear()
            ? ''
            : ' ' + timeStamp.getFullYear();
        return day + ' ' + month + year;
      }
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
    alert(type, message) {
      this.$alertify[type](message);
    },
    /* DOM EVENTS */
    debounce(func, delay) {
      clearTimeout(func._tId);
      func._tId = setTimeout(function() {
        func();
      }, delay);
    },
    easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    },
    scrollTo(element, to, duration) {
      let start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20;

      const animateScroll = () => {
        currentTime += increment;
        element.scrollTop = this.easeInOutQuad(
          currentTime,
          start,
          change,
          duration
        );
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll);
        }
      };
      animateScroll();
    },
    scrollToLoad({ target: { scrollTop, clientHeight, scrollHeight } }, fn) {
      if (scrollTop > this.lastScrollTop) {
        if (scrollHeight - scrollTop - clientHeight < 1) {
          this.showSpinner = true;
          this.scrollTo(
            this.$refs.notiScroll,
            this.$refs.notiScroll.scrollHeight,
            1000
          );
          this.debounce(fn, 500);
        }
      }
      this.lastScrollTop = scrollTop;
    },
    /* FRIEND REQUESTS */
    async cancelAddContactAction(data) {
      this.UPDATE_USERS_KEY({
        userId: data.contactId,
        key: 'friendRequest',
        value: { holder: true }
      });
      this.$set(this.SPINNER_SHOW, data.contactId, true);
      try {
        const res = await this.cancelAddContact({ contactId: data.contactId });
        const notificationId = res.data.data.deletedDoc._id;

        this.REMOVE_HOME_NOTIFICATIONS({
          _id: notificationId,
          self: data.self
        });

        this.$set(this.SPINNER_SHOW, data.contactId, false);

        this.DELETE_USERS_KEY({
          userId: data.contactId,
          key: 'friendRequest'
        });

        this.$socket.emit('friend-request-off', {
          contactId: data.contactId,
          notificationId: notificationId
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
        this.$set(this.SPINNER_SHOW, data.contactId, false);
      }
    },
    async acceptFriendRequest(data) {
      this.UPDATE_USERS_KEY({
        userId: data.contactId,
        key: 'friendRequest',
        value: { holder: true }
      });
      this.$set(this.SPINNER_SHOW, data.contactId, true);

      try {
        const res = await this.acceptContact({ contactId: data.contactId });
        const notification = res.data.data.updatedDoc;

        this.UPDATE_HOME_NOTIFICATION({
          _id: notification._id,
          value: notification
        });

        this.$set(this.SPINNER_SHOW, data.contactId, false);

        this.UPDATE_USERS_KEY({
          userId: data.contactId,
          key: 'friendRequest',
          value: { accept: true }
        });

        this.$socket.emit('friend-request-accepted', {
          contactId: data.contactId,
          notificationId: notification._id
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
        this.$set(this.SPINNER_SHOW, data.contactId, false);
      }
    }
  }
};

module.exports = mixin;
