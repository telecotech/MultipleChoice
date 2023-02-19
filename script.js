var currentQuestion = 0;
var score = 0;
var questions = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["js", "script", "javascript","None of the above"],
    answer: "script"
  },
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    choices: ["var", "let", "Both A and B", "None of the above"],
    answer: "Both A and B"
  },
  {
    question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    choices: ["Ignores the statement", "Throws an error", "Gives a warning","None of the above"],
    answer: "Ignores the statement"
  },
  {
    question: "Which of the following methods can be used to display data in some form using Javascript?",
    choices: ["document.write()", "console.log()", "window.alert()","All of the above"],
    answer: "All of the above"
  },
  {
    question: " How can a datatype be declared to be a constant type? ",
    choices: ["const", "var", "let", "constant"],
    answer: "const"
  }
];

document.getElementById('start-button').addEventListener("click", function() {
  document.getElementById('start-button-container').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';
  showQuestion();
});


   function showQuestion() {
  document.getElementById('question-container').style.display = 'block';
  document.getElementById('questions').textContent = questions[currentQuestion].question;
  var choices = document.getElementById('choices');
  choices.innerHTML = '';
  for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
    var choice = questions[currentQuestion].choices[i];
    var button = document.createElement('button');
    button.type = 'button';
    button.value = choice;
    button.textContent = choice;
    button.addEventListener('click', function() {
      console.log('Button clicked:', choice);
      handleAnswer(choice);
    });
    choices.appendChild(button);
  }
}

function handleAnswer() {
  const selectedOption = document.querySelector('button:focus');

  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }

  const answer = selectedOption.value;
  const isCorrect = answer === questions[currentQuestion].answer;
  const message = isCorrect ? "Correct!" : "Incorrect.";
  alert(message);

  if (isCorrect) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion === questions.length) {
    displayResult([{initials: "AB", score: score}]);
  } else {
    showQuestion();
  }
}

function displayResult() {
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('save-score-container').style.display = 'block';
  
  var resultText = "You scored " + score + " out of " + questions.length;
  document.getElementById('result').textContent = resultText;
  
  var initialsInput = document.createElement('input');
  initialsInput.type = 'text';
  initialsInput.id = 'initials';
  initialsInput.placeholder = 'Enter your initials';
  
  var submitButton = document.createElement('button');
  submitButton.type = 'button';
  submitButton.textContent = 'Submit';
  submitButton.addEventListener('click', function() {
    saveScore(initialsInput.value, score);
  
  });
  
  var form = document.createElement('form');
  form.appendChild(initialsInput);
  form.appendChild(submitButton);
  
  document.getElementById('score-form').appendChild(form);
}

// 
function saveScore(initials, score) {
  fetch('scores.json')
    .then(response => response.json())
    .then(data => {
      console.log(data); // check if data is fetched correctly

      // add the new score to the data
      data.score.push({initials: initials, score: score});

      // sort the scores in descending order
      data.score.sort((a, b) => b.score - a.score);

      // save the data back to the file
      fetch('scores.json', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
}




 
  









