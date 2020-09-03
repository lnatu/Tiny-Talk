const { mapGetters, mapMutations, mapActions } = require('vuex');
const config = require('@/config');

const mixin = {
  computed: {
    ...mapGetters([
      'GET_USERS',
      'GET_HOME_NOTIFICATIONS',
      'GET_CONTACTS',
      'GET_SHOW_TYPING',
      'GET_CONVERSATIONS',
      'GET_ONE_CONVERSATION',
      'GET_SHOW_JTB'
    ]),
    isFormValid() {
      return validObj => this.$v[validObj].$invalid;
    },
    isShowTyping() {
      return conversationId =>
        this.GET_SHOW_TYPING.isOn &&
        this.GET_SHOW_TYPING.conversationId === conversationId;
    }
  },
  data() {
    return {
      validObj: '',
      lastScrollTop: 0,
      scrollPos: 0,
      scrollDistance: 0,
      scrollTimer: null,
      showJumpToBot: false,
      showSpinner: false,
      SPINNER_SHOW: {},
      typing: false,
      lastTypingTime: null
    };
  },
  methods: {
    ...mapMutations([
      'toggleLoader',
      'SET_LOCAL_USER',
      'PUSH_CONVERSATION',
      'UPDATE_HOME_NOTIFICATION',
      'REMOVE_HOME_NOTIFICATIONS',
      'UPDATE_USERS_KEY',
      'DELETE_USERS_KEY',
      'ADD_TO_FIRST_CONTACTS',
      'SORT_CONTACTS',
      'SET_SHOW_JTB'
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
    formatAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return hours + ':' + minutes + ' ' + ampm;
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
    scrollHitTop({ target: { scrollTop } }, cb) {
      if (scrollTop === 0) {
        cb();
      }
    },
    updateTyping(data) {
      if (!this.typing) {
        this.typing = true;
        this.$socket.emit('typing-on', {
          contactId: data.contactId,
          conversationId: data.conversationId
        });
      }

      this.lastTypingTime = new Date().getTime();
      setTimeout(() => {
        const timer = new Date().getTime();
        const timeDiff = timer - this.lastTypingTime;
        if (timeDiff >= config.LIMITS.TYPING_TIMER_MAX && this.typing) {
          this.$socket.emit('typing-off', {
            contactId: data.contactId,
            conversationId: data.conversationId
          });
          this.typing = false;
        }
      }, config.LIMITS.TYPING_TIMER_MAX);
    },
    scrollToBottom(el) {
      el.scrollTop = el.scrollHeight;
    },
    scrollingDown({ target: { scrollTop } }) {
      clearTimeout(this.scrollTimer);
      this.scrollDistance++;
      if (this.scrollDistance >= 60 && !this.GET_SHOW_JTB) {
        this.SET_SHOW_JTB(true);
      }
      this.scrollTimer = setTimeout(() => {
        this.scrollDistance = 0;
      }, 2000);
      this.scrollPos = scrollTop;
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
        const conversation = res.data.data.conversation;
        conversation.messages = [];

        this.PUSH_CONVERSATION(conversation);

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
          contact,
          conversation,
          contactId: data.contact,
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
