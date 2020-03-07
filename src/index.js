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

  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === '(') {
      operators.push(expr[i])
    }

    if (expr[i] === ')') {
      while(operators[operators.length - 1] !== '(' && operators.length) {
        let currentResult = doMath(numbers[numbers.length - 2], numbers[numbers.length - 1], operators[operators.length - 1]);
        numbers.pop();
        numbers.pop();
        operators.pop();
        numbers.push(currentResult);
        if (!operators.length) {
          throw new Error('ExpressionError: Brackets must be paired');
        }
      }
      operators.pop();

    }

    if (!isNaN(parseInt(expr[i], 10)) && isNaN(parseInt(expr[i + 1], 10)) && isNaN(parseInt(expr[i - 1], 10))) {
      numbers.push(Number(expr[i]));
    } else if (!isNaN(parseInt(expr[i], 10)) && !isNaN(parseInt(expr[i + 1], 10))) {
      let multiNumber = expr[i];

      while (!isNaN(parseInt(expr[i + 1], 10))) {
        multiNumber = multiNumber + expr[i + 1];
        i++;
      }

      numbers.push(Number(multiNumber));
    }

    if (isNaN(parseInt(expr[i], 10)) && expr[i] !== ' ' && expr[i] !== '(' && expr[i] !== ')') {
      if (operators.length) {
        while (priority[expr[i]] <= priority[operators[operators.length - 1]] && priority[operators[operators.length - 1]]) {
          let currentResult = doMath(numbers[numbers.length - 2], numbers[numbers.length - 1], operators[operators.length - 1]);
          numbers.pop();
          numbers.pop();
          operators.pop();
          numbers.push(currentResult);
        }
        operators.push(expr[i])
      } else {
        operators.push(expr[i])
      }
    }
  }

  while (operators.length) {
    if (operators[operators.length - 1] === '(') {
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
