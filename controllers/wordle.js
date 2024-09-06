require("dotenv").config();
const { getTodayWord, wordList } = require("../helpers/wordle");

exports.check_word = async (req, res) => {
  try {
    const ans = getTodayWord();

    // 将单词转换为小写
    word = req.body.word.toLowerCase();
    console.log(ans, word);
    // 检查单词是否在表中
    if (!wordList.has(word)) {
      return { error: "Invalid word" }; // 如果单词不存在，返回错误信息
    }

    // 创建一个 Map 来统计答案中每个字符出现的次数
    let countAns = new Map();
    for (const c of ans) {
      countAns.set(c, (countAns.get(c) || 0) + 1); // 如果字符存在，则加1，否则设置为1
    }
    let result = []; // 用于存储结果数组：-1（不存在），0（位置错误），1（位置正确）
    let keyboard = new Map(); // 创建一个 Map 来跟踪键盘提示
    let wordForCount = ans; // 答案的临时副本，用于处理重复字母

    for (let i = 0; i < 5; i++) {
      // 如果letter不在word里
      if (!wordForCount.includes(word[i])) {
        result.push(-1); //标记为灰色
        keyboard.set(word[i], -1);
      } else {
        //如果letter在word里
        //从临时答案删掉一个字母
        wordForCount = wordForCount.replace(word[i], "", 1); // avoid duplicate letters cannot be recognized

        if (word[i] != ans[i]) {
          //如果位置不对，标黄
          result.push(0);
          keyboard.set(word[i], 0);
        } else {
          //如果位置也对
          result.push(1);

          // if (countAns.get(word[i]) > 1)
          //   keyboard.set(word[i], 0); //但还有重复字母没被猜到，标黄
          // else keyboard.set(word[i], 1); // 没有重复，标绿
          keyboard.set(word[i], 1); // 没有重复，标绿
          countAns.set(word[i], countAns.get(word[i]) - 1);
        }
      }
    }
    //在前端double check，如果已经标绿，不要标黄/灰。
    //如果已经标黄，不要标灰
    console.log("result", result, "keyboard", keyboard);
    return res.json({
      message: "compare finished",
      result: result,
      keyboard: Object.fromEntries(keyboard),
    });
    // return { result: result, keyboard: JSON.stringify(keyboard) };
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
