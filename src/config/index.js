const version = '/api/v1/';

exports.api = {
  auth: {
    login: `${version}users/login`,
    logout: `${version}users/logout`,
    signup: `${version}users/signup`,
    activateAccount: `${version}users/activate/token`,
    updateAvatar: `${version}users/updateAvatar`,
    updateAccountInfo: `${version}users/updateAvatar`,
    updatePassword: `${version}users/updatePassword`
  },
  contacts: {
    getMyContacts: `${version}users/contacts`
  },
  conversations: {
    getMyConversations: `${version}users/conversations`
  },
  users: {
    addContact: `${version}users/addContact`,
    acceptContact: `${version}users/contacts/accept`,
    cancelAddContact: `${version}users/cancelAddContact`,
    findContact: `${version}users/findContact`,
    getNotifications: `${version}users/notifications`
  }
};

exports.LIMITS = {
  RESULTS_PER_CALL: 10
};

exports.localKeys = {
  CONVERSATIONS_KEY: 'user-conversations',
  CONVERSATION_KEY: 'user-conversation',
  CONVERSATION_CONTACT_ID_KEY: 'user-conversation-contact-id',
  USER_KEY: 'current-user',
  NOTIFICATIONS_KEY: 'user-notifications',
  TOTAL_NOTIFICATIONS_KEY: 'total-notifications',
  USER_CONTACT_KEY: 'user-contacts'
};
