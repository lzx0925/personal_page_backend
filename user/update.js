const User = require("../models/user");

const update = async function (modifyData) {
  let result = { user: null, error: null };

  const checkUniquePromise = new Promise((resolve) => {
    User.find({ username: modifyData.username })
      .then((user) => {
        if (user.length != 0 && user[0].email != modifyData.email) {
          console.log(111, user);
          result.error = "Username already exists";
        }
        resolve();
      })
      .catch((err) => {
        result.error = err;
        resolve();
      });
  });
  await checkUniquePromise;
  if (result.error) return result;

  const updatePromise = new Promise((resolve) => {
    User.updateOne(
      { email: modifyData.email, password: modifyData.password },
      {
        $set: {
          username: modifyData.username,
          firstname: modifyData.firstname,
          lastname: modifyData.lastname,
          gender: modifyData.gender,
          birthday: modifyData.birthday,
          headshot: modifyData.headshot,
        },
      }
    )
      .exec()
      .then((user) => {
        console.log("Document updated successfully");
        resolve();
      })
      .catch((err) => {
        console.log(err);
        result.error = err;
        resolve();
      });
  });
  await updatePromise;
  if (result.error) return result;
  const loginPromise = new Promise((resolve) => {
    User.find({ email: modifyData.email, password: modifyData.password })
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
  update: update,
};
