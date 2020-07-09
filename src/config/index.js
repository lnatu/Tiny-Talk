const version = '/api/v1/';

exports.api = {
  auth: {
    signup: `${version}users/signup`,
    activateAccount: `${version}users/activate/token`
  }
};
