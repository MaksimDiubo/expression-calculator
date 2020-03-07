function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  function doMath(x, y, operator){
    var math = 0;
    switch(operator) {
        case '+':
        math = x + y;
        break;
        case '-':
        math = x - y;
        break;
        case '*':
        math = x * y;
        break;
        case '/':
          if (y === 0) {
            throw new Error('TypeError: Division by zero.')
          } else {
            math = x / y;
          }
        break;
    }
  return math
  }


  const priority = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  }

  let numbers = [];
  let operators = [];
  let inputArr = [];

 if (expr.includes(' ')) {
   inputArr = expr.split(' ');
 } else {
   inputArr = expr.split('');
 }

  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] === '(') {
      operators.push(inputArr[i])
    }
    if (inputArr[i] === ')') {
      while(operators[operators.length - 1] !== '(') {
        let currentResult = doMath(numbers[numbers.length - 2], numbers[numbers.length - 1], operators[operators.length - 1]);
        numbers.pop();
        numbers.pop();
        operators.pop();
        numbers.push(currentResult);
      }
      operators.pop();
    }
    if (Number.parseInt(inputArr[i], 10) || inputArr[i] === '0') {
      numbers.push(Number(inputArr[i]));
    }
    if (!Number.parseInt(inputArr[i], 10) && inputArr[i] && inputArr[i] !== '(' && inputArr[i] !== ')' && inputArr[i] !== '0') {
      if (operators.length) {
        while (priority[inputArr[i]] <= priority[operators[operators.length - 1]] && priority[operators[operators.length - 1]]) {
          let currentResult = doMath(numbers[numbers.length - 2], numbers[numbers.length - 1], operators[operators.length - 1]);
          numbers.pop();
          numbers.pop();
          operators.pop();
          numbers.push(currentResult);
        }
        operators.push(inputArr[i])
      } else {
        operators.push(inputArr[i])
      }
    }
  }

  while (operators.length) {
    if (operators[operators.length - 1] === ')' || operators[operators.length - 1] === '(') {
      throw new Error('ExpressionError: Brackets must be paired');
    } else {
      let currentResult = doMath(numbers[numbers.length - 2], numbers[numbers.length - 1], operators[operators.length - 1]);
      numbers.pop();
      numbers.pop();
      operators.pop();
      numbers.push(currentResult);
    }
  }

    return numbers[numbers.length - 1];
}

module.exports = {
    expressionCalculator
}
