const { mapGetters, mapMutations, mapActions } = require('vuex');
const config = require('@/config');

const mixin = {
  computed: {
    ...mapGetters(['GET_USERS', 'GET_HOME_NOTIFICATIONS', 'GET_CONTACTS']),
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
      'DELETE_USERS_KEY',
      'ADD_TO_FIRST_CONTACTS',
      'SORT_CONTACTS'
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
        return `Just now`;
      }
      if (secondsPast < 3600) {
        const time = parseInt(secondsPast / 60);
        return time === 1 ? `${time} minute ago` : `${time} minutes ago`;
      }
      if (secondsPast <= 86400) {
        const time = parseInt(secondsPast / 3600);
        return time === 1 ? `${time} hour ago` : `${time} hours ago`;
      }
      if (secondsPast > 86400) {
        const time = parseInt(secondsPast / 86400);
        return time === 1 ? `${time} day ago` : `${time} days ago`;
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
        userId: data.contact,
        key: 'friendRequest',
        value: { holder: true }
      });
      this.$set(this.SPINNER_SHOW, data.contact, true);
      try {
        const res = await this.cancelAddContact({ contact: data.contact });
        const notificationId = res.data.data.deletedDoc._id;

        this.REMOVE_HOME_NOTIFICATIONS({
          _id: notificationId
        });

        this.$set(this.SPINNER_SHOW, data.contact, false);

        this.DELETE_USERS_KEY({
          userId: data.contact,
          key: 'friendRequest'
        });

        this.$socket.emit('friend-request-off', {
          contactId: data.contact,
          notificationId: notificationId
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
        this.$set(this.SPINNER_SHOW, data.contact, false);
      }
    },
    async acceptFriendRequest(data) {
      this.UPDATE_USERS_KEY({
        userId: data.contact,
        key: 'friendRequest',
        value: { holder: true }
      });
      this.$set(this.SPINNER_SHOW, data.contact, true);

      try {
        const res = await this.acceptContact({ contact: data.contact });
        const contactObj = res.data.data.contact;
        const notification = res.data.data.updatedDoc;

        const user = {
          _id: contactObj._id,
          contact: contactObj.user,
          createdAt: contactObj.createdAt,
          status: contactObj.status,
          updatedAt: contactObj.updatedAt
        };

        const contact = {
          _id: contactObj._id,
          contact: contactObj.contact,
          createdAt: contactObj.createdAt,
          status: contactObj.status,
          updatedAt: contactObj.updatedAt
        };

        this.ADD_TO_FIRST_CONTACTS(user);

        this.UPDATE_HOME_NOTIFICATION({
          _id: notification._id,
          value: notification
        });

        this.$set(this.SPINNER_SHOW, data.contact, false);

        this.UPDATE_USERS_KEY({
          userId: data.contact,
          key: 'friendRequest',
          value: { accept: true }
        });

        this.$socket.emit('friend-request-accepted', {
          contactId: data.contact,
          contact,
          notificationId: notification._id
        });
      } catch (err) {
        console.log(err);
        console.log(err.response);
        this.$set(this.SPINNER_SHOW, data.contact, false);
      }
    }
  }
};

module.exports = mixin;
