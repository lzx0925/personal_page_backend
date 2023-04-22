const User = require("../models/user");

const register = async function (registerData) {
  let result = { user: null, error: null };
  let userInfo = null;
  let nameMessage = null;
  let emailMessage = null;
  let registerMessage = null;
  let error = null;
  const newUser = new User(registerData);
  const namePromise = new Promise((resolve) => {
    User.findOne({ username: registerData.username })
      .then((user) => {
        user ? (result.error = "Username already exists") : null;
        resolve();
      })
      .catch((err) => {
        result.error = err;
        resolve();
      });
  });
  await namePromise;
  if (result.error) return result;

  const emailPromise = new Promise((resolve) => {
    User.findOne({ email: registerData.email })
      .then((user) => {
        user ? (result.error = "Email already exists") : null;
        resolve();
      })
      .catch((err) => {
        error = err;
        resolve();
      });
  });
  await emailPromise;
  if (result.error) return result;

  const registerPromise = new Promise((resolve) => {
    if (!emailMessage && !nameMessage) {
      newUser
        .save()
        .then((savedUser) => {
          result.user = savedUser;
          registerMessage = "User registered successfully!";
          resolve();
        })
        .catch((err) => {
          error = err;
          resolve();
        });
    } else {
      resolve();
    }
  });
  await registerPromise;
  return result;
};

module.exports = {
  register: register,
};
/*nameMessage: nameMessage,
    emailMessage: emailMessage,
    error: error,
    registerMessage: registerMessage, */
