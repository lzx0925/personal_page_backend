const Message = require("../models/message");
const addMessage = async function (messageData) {
  let result = { message: null, error: null };

  const addPromise = new Promise((resolve) => {
    const newMessage = new Message(messageData);
    newMessage
      .save()
      .then((newMessage) => {
        result.message = newMessage;
        resolve();
      })
      .catch((err) => {
        result.error = err;
        resolve();
      });
  });
  await addPromise;
  return result;
};
module.exports = {
  addMessage: addMessage,
};
