window.onload = function() {
  generateNewNumber();
  document.getElementById('check-answer').onclick = checkAnswer;
  document.getElementById('next-question').onclick = function() {
    generateNewNumber();
    document.getElementById('user-input').value = ''; // Clear the input field
    document.getElementById('result').textContent = ''; // Clear the result text
    document.getElementById('explanation').style.display = 'none'; // Hide the explanation
    this.style.display = 'none'; // Hide the Next button
    document.getElementById('check-answer').style.display = 'inline'; // Show the Check Answer button
  };
};

function generateNewNumber() {
  // Generates a random decimal number between 1 and 255 for 8-bit binary numbers
  const randomNumber = Math.floor(Math.random() * 255) + 1;
  document.getElementById('decimal-number').textContent = randomNumber;
}

function checkAnswer() {
  const decimalNumber = parseInt(document.getElementById('decimal-number').textContent);
  const userInputRaw = document.getElementById('user-input').value;

  // Remove spaces from user input for validation
  const userInput = userInputRaw.replace(/ /g, '');
  const correctAnswer = formatBinaryString(decimalNumber.toString(2));

  if (userInput === correctAnswer.replace(/ /g, '')) {
    document.getElementById('result').textContent = 'Correct! Great job!';
    document.getElementById('result').style.color = 'green';
  } else {
    document.getElementById('result').textContent = `Incorrect, the correct binary of ${decimalNumber} is ${correctAnswer}.`;
    document.getElementById('result').style.color = 'red';
  }

  buildExplanation(decimalNumber, correctAnswer.replace(/ /g, ''), userInput === correctAnswer.replace(/ /g, ''));
  document.getElementById('next-question').style.display = 'inline'; // Show the Next button
  document.getElementById('check-answer').style.display = 'none'; // Hide the Check Answer button
}

function formatBinaryString(binaryStr) {
  // Pad the binary string to 8 bits
  const paddedBinary = binaryStr.padStart(8, '0');
  // Add a space after every 4 characters for display purposes
  return paddedBinary.substring(0, 4) + ' ' + paddedBinary.substring(4);
}

function buildExplanation(decimal, binary, isCorrect) {
  let explanationHTML = '<div class="explanation-table">';
  const binaryArray = binary.split('').reverse();

  binaryArray.forEach((digit, index) => {
    explanationHTML += `
      <div class="explanation-row">
        <div class="explanation-cell binary-digit">${digit}</div>
        <div class="explanation-cell power-of-two">2<sup>${index}</sup></div>
        <div class="explanation-cell sum-value">${digit === '1' ? Math.pow(2, index) : 0}</div>
      </div>
    `;
  });

  explanationHTML += '</div>';
  explanationHTML += isCorrect ? '<p>Sum these values to get the decimal number.</p>' : '<p>Try converting the decimal number to binary yourself and sum the values.</p>';

  const explanationDiv = document.getElementById('explanation');
  explanationDiv.innerHTML = explanationHTML;
  explanationDiv.style.display = 'block'; // Show the explanation
}

// ... other JavaScript code ...
