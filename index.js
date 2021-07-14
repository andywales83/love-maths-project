// Wait until the DOM has loaded before running the game
// Get the button elements, and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
  
    for (let button of buttons) { //a better method of iterating through an array.
      button.addEventListener("click", function () {
        if (this.getAttribute("data-type") === "submit") {
          checkAnswer();
        } else {
          let gameType = this.getAttribute("data-type");
          runGame(gameType);
        }
      });
    }
  
    document.getElementById("answer-box").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        checkAnswer();
      }
    })
  
    runGame("addition");
  });
  
  function runGame(gameType) {
  
    // Creates two numbers with a value of between 1 and 25
    // Math.floor rouncs down to the nearest whole number
    // Math.random generates random numbers
  
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();
  
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;
  
    // Selects and displays the question depending on the gameType
    // which we set when we called the function
    if (gameType === "addition") {
      displayAdditionQuestion(num1, num2);
    } else if (gameType === "subtract") {
      displaySubtractQuestion(num1, num2);
    } else if (gameType === "multiply") {
      displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
      displayDivisionQuestion(num1, num2);
    } else {
      alert(`Unknown game type: ${gameType}`);
      throw `Unknown game type ${gameType}, aborting`;
    }
  
  }
  
  
  // Called when the user clicks the Submit button or presses Enter
  function checkAnswer() {
  
    // Checks the answeragianst the first element in
    // the returned calculatedCorrectAnswer array
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer(); // calculatedAnswer is an array
    let isCorrect = userAnswer === calculatedAnswer[0]; // isCorrect has a true or false value
  
    if (isCorrect) {
      alert("Hey! You got it right! :D");
      incrementScore();
    } else {
      alert(`Awwww... you answered ${userAnswer}. The correct answer is ${calculatedAnswer[0]}!`);
      incrementWrongAnswer();
    }
  
    runGame(calculatedAnswer[1]);
  }
  
  function calculateCorrectAnswer() {
  
    // Gets the opearnds (the numbers) and the operator (+ - * / etc.)
    //directly from the DOM
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;
  
    if (operator === "+") {   // This is the addition game
      return [operand1 + operand2, "addition"]; // return an array containing the correct answer and game type
    } else if (operator === "x") {
      return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
      return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
      return [operand1 / operand2, "division"];
    } else {
      alert(`Unimplemented operator: ${operator}`);
      throw `Unimplemented operator ${operator}, aborting`;
    }
  
  }
  
  function incrementScore() {
  
    // Gets the current score from the Dom and increments it
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = ++oldScore;
  
  }
  
  function incrementWrongAnswer() {
  
    // Gets the tally of incorrect answers from the Dom and increments it
    let oldScore = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++oldScore;
  
  }
  
  function displayAdditionQuestion(operand1, operand2) {
  
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
  
  }
  
  function displaySubtractQuestion(operand1, operand2) {
  
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";
  
  }
  
  function displayMultiplyQuestion(operand1, operand2) {
  
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
  
  }
  
  function displayDivisionQuestion(operand1, operand2) {
  
    operand1 = operand1 * operand2
  
    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "/";
  
  }