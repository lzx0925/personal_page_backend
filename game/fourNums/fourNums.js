function getFourNums() {
  const nums = [];
  for (let i = 0; i < 4; i++) {
    const randomNum = Math.floor(Math.random() * 13) + 1;
    nums.push(randomNum);
  }
  return nums;
}

function checkFourNums(expression, paranthesis) {
  function calculate(b, symbol, a) {
    if (symbol === "+") return a + b;
    if (symbol === "-") return a - b;
    if (symbol === "*") return a * b;
    if (symbol === "/") return a / b;
  }
  if (paranthesis) {
    const list = paranthesis.sort().reverse();
    for (let paran of list) {
      if (paran === 5) expression.push("()");
      else if (paran === 4) expression.splice(5, 0, "()");
      else expression.splice(paran * 2 + 1, 0, "()");
    }
  }
  console.log(expression);
  let ans = [];
  //first iteration to calculate all () expression
  for (const i of expression) {
    if (i === "()") ans.push(calculate(Number(ans.pop()), ans.pop(), Number(ans.pop())));
    else ans.push(i);
  }
  //second iteration to calculate all * / expression
  for (let i = 0; i < ans.length; i++) {
    if (ans[i] === "*" || ans[i] === "/") {
      const a = Number(ans[i - 1]);
      const b = Number(ans[i + 1]);
      const symbol = ans[i];
      ans.splice(i - 1, 3, calculate(b, symbol, a));
      i--;
    }
  }
  //last iteration to calculate all;
  for (let i = 0; i < ans.length; i++) {
    if (ans[i] === "+" || ans[i] === "-") {
      const a = Number(ans[i - 1]);
      const b = Number(ans[i + 1]);
      const symbol = ans[i];
      ans.splice(i - 1, 3, calculate(b, symbol, a));
      i--;
    }
  }

  return ans[0];
}

// const haveAns = false;
// function checkAnswer();

module.exports = { getFourNums: getFourNums, checkFourNums: checkFourNums };
