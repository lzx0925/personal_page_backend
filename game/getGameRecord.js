const FourNums = require("../models/fourNums");
const getFourNumsRecord = async function (email, result, chance) {
  const newHistory = new FourNums({
    user: email,
    status: result === 24 ? "win" : "lose",
    stage: result === 24 ? chance : 0,
  });
  await newHistory.save();

  const results = await FourNums.aggregate([
    {
      $match: {
        user: email,
      },
    },
    {
      $group: {
        _id: "$user",
        win: {
          $sum: {
            $cond: [{ $eq: ["$status", "win"] }, 1, 0],
          },
        },
        total: { $sum: 1 },
      },
    },
  ]);

  if (results.length === 0) return JSON.stringify({ total: 0, win: 0 });

  return JSON.stringify({
    total: results[0].total,
    win: results[0].win,
  });
};

const Wordle = require("../models/Wordle");

const getWordleRecord = async function (email, stage) {
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
  getFourNumsRecord: getFourNumsRecord,
  getWordleRecord: getWordleRecord,
};
