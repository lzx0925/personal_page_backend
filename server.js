const express = require("express");
const {port, database_url} = require("./config");
const cors = require("cors");
const { compareWordle } = require("./game/wordle/wordle");
//const { saveWordle } = require("./game/wordle/saveWordle");
const { register } = require("./user/register");
const { login } = require("./user/login");
const { update } = require("./user/update");
const { addMessage } = require("./message/addMessage");
const { getAllMessage, getUserMessage } = require("./message/getMessage");
const { getFourNums, checkFourNums } = require("./game/fourNums/fourNums");
const { getFourNumsRecord, getWordleRecord } = require("./game/getGameRecord");
const mongoose = require("mongoose");
const url = database_url;
const app = express();

app.use(express.json());
app.use(cors());
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

/*---------------------Wordle--------------------------*/
app.post("/wordle", (req, res) => {
  const word = req.body.word;
  console.log("word is", word);
  const result = compareWordle(word);
  console.log("result is", result);
  res.send(result);
});

app.post("/save_wordle", async (req, res) => {
  //const result = await saveWordle(req.body.email, req.body.stage);
  const result = await getWordleRecord(req.body.email, req.body.stage);
  console.log(result);
  res.send(result);
});
/*---------------------Wordle--------------------------*/

/*--------------------Four Nums------------------------*/
app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.post('/', (req, res) => {
  res.sendStatus(200);
});

app.post("/fourNums", (req, res) => {
  res.send({ nums: getFourNums() });
});

app.post("/checkFourNums", async(req, res) => {
  console.log("founums I get ", req.body);
  const result = checkFourNums(req.body.expression,req.body.paranthesis);
  console.log("result I get",result);
  let gameData = null;
  //if win or lose, save and retrieve game data
  if (result === 24 || (result !== 24 && req.body.chance === 1))
    gameData = await getFourNumsRecord(req.body.email, result, req.body.chance);
  console.log("game data", gameData);
  res.send({ result: result, gameData: gameData });
});
/*--------------------Four Nums------------------------*/

app.post("/register", async (req, res) => {
  const userRegister = await register(req.body.registerData);
  console.log(userRegister);
  res.send({
    user: userRegister.user,
    error: userRegister.error,
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  const userLogin = await login(
    req.body.loginData.email,
    req.body.loginData.password
  );
  res.send({ user: userLogin.user, error: userLogin.error });
});

app.post("/update", async (req, res) => {
  console.log(req.body);
  const userUpdate = await update(req.body.updateData);
  res.send({ user: userUpdate.user, error: userUpdate.error });
});

app.post("/sendmessage", async (req, res) => {
  const result = await addMessage(req.body);
  console.log("add:", result);
  res.send({ message: result });
});

app.post("/allmessage", async (req, res) => {
  const result = await getAllMessage(
    req.body.page,
    req.body.numbers,
    req.body.sort
  );
  //console.log("get all:", result);
  res.send({ messages: result });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Export the Express API
module.exports = app;