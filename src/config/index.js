const version = '/api/v1/';

exports.api = {
  auth: {
    login: `${version}users/login`,
    logout: `${version}users/logout`,
    signup: `${version}users/signup`,
    activateAccount: `${version}users/activate/token`
  }
};

exports.localKeys = {
  USER_KEY: 'current-user'
};
