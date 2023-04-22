const User = require("../models/user");

const login = async function (email, password) {
  let result = { user: null, error: null };

  const loginPromise = new Promise((resolve) => {
    User.find({ email: email, password: password })
      .then((user) => {
        result.user = user[0];
        resolve();
      })
      .catch((err) => {
        result.error = err;
        resolve();
      });
  });
  await loginPromise;
  return result;
};

module.exports = {
  login: login,
};
