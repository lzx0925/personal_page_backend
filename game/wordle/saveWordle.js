const Wordle = require("../../models/Wordle");

const saveWordle = async function (email, stage) {
  const newHistory = new Wordle({ user: email, stage: stage });
  await newHistory.save();

  // retrieve history for email and group by stage
  const history = await Wordle.aggregate([
    { $match: { user: email } },
    {
      $group: {
        _id: "$stage",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        stage: "$_id",
        count: 1,
      },
    },
  ]);

  // calculate sum for each stage
  let total = 0;
  let record = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  history.forEach((stage) => {
    record[stage.stage] = stage.count;
    total += stage.count;
  });
  return { total: total, record: JSON.stringify(record) };
};

module.exports = {
  saveWordle: saveWordle,
};
