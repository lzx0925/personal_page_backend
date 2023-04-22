const Message = require("../models/message");

const getUserMessage = async function (username, page, numbers) {
  result = { message: [], error: null };
  const onePromise = new Promise((resolve) => {
    Message.find({ username: username })
      .skip((page - 1) * numbers)
      .limit(numbers)
      .sort({ createdAt: -1 })
      .then((userMessage) => {
        result.message = userMessage;
        resolve();
      })
      .catch((err) => {
        result.error = err;
        resolve();
      });
  });
  await onePromise;
  return result;
};

const getAllMessage = async function (page, numbers, sort) {
  result = { message: [], maxPage: null, error: null };
  const allPromise = new Promise((resolve) => {
    Message.find({})
      .sort({ createdAt: sort })
      .skip((page - 1) * numbers)
      .limit(numbers)
      .then((allMessage) => {
        console.log("number:", numbers);
        console.log("sort:", sort);
        console.log(allMessage.length);
        result.message = allMessage;
        resolve();
      })
      .catch((err) => {
        result.error = err;
        resolve();
      });
  });
  const sizePromise = new Promise((resolve) => {
    Message.find({}).then((allMessage) => {
      result.maxPage = Math.ceil(allMessage.length / numbers);
      resolve();
    });
    
  });
  await allPromise;
  await sizePromise;
  return result;
};
module.exports = {
  getUserMessage: getUserMessage,
  getAllMessage: getAllMessage,
};
