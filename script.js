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

var timer;
var timeRemaining = 60;

document.getElementById('start-button').addEventListener("click", function() {
  document.getElementById('start-button-container').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';
  document.getElementById('timer-container').style.display = 'block';
  showQuestion();
  startTimer();
});

function startTimer() {
  document.getElementById('timer').textContent = timeRemaining;

  timer = setInterval(function() {
    timeRemaining--;
    document.getElementById('timer').textContent = timeRemaining;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      displayResult([{initials: "AB", score: score}]);
    }
    }, 1000);
}

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

  if (isCorrect) {
    score++;
  } else {
    timeRemaining -= 5;
  }

  alert(message);

  currentQuestion++;

  if (currentQuestion === questions.length) {
    clearInterval(timer);
    displayResult([{initials: "AB", score: score}]);
  } else {
    showQuestion();
  }
}

function displayResult() {
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('timer-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';

  var result = document.getElementById('result');
  result.innerHTML = '';

  var heading = document.createElement('h2');
  heading.textContent = "Quiz Results";
  result.appendChild(heading);

  var initials = prompt("Please enter your initials:");
  if (initials === null) {
    initials = "Unknown";
  }

  var row = document.createElement('div');
  row.className = 'result-row';

  var initialsDiv = document.createElement('div');
  initialsDiv.className = 'result-initials';
  initialsDiv.textContent = initials;
  row.appendChild(initialsDiv);

  var scoreDiv = document.createElement('div');
  scoreDiv.className = 'result-score';
  scoreDiv.textContent = score + " out of " + questions.length;
  row.appendChild(scoreDiv);

  result.appendChild(row);

  // Add score and initials to array of scores
  score.push({ initials: initials, score: score });
}

function displayScores() {
  var result = document.getElementById('result');
  result.innerHTML = '';

  var heading = document.createElement('h2');
  heading.textContent = "Quiz Scores";
  result.appendChild(heading);

  var scores = JSON.parse(localStorage.getItem('scores') || '[]');
  if (scores.length === 0) {
    var message = document.createElement('p');
    message.textContent = "No scores have been saved yet.";
    result.appendChild(message);
  } else {
    var table = document.createElement('table');
    table.className = 'score-table';
    result.appendChild(table);

    var headerRow = document.createElement('tr');
    table.appendChild(headerRow);

    var initialsHeader = document.createElement('th');
    initialsHeader.textContent = "Initials";
    headerRow.appendChild(initialsHeader);

    var scoreHeader = document.createElement('th');
    scoreHeader.textContent = "Score";
    headerRow.appendChild(scoreHeader);

    scores.forEach(function(item) {
      var row = document.createElement('tr');
      table.appendChild(row);

      var initialsCell = document.createElement('td');
      initialsCell.textContent = item.initials;
      row.appendChild(initialsCell);

      var scoreCell = document.createElement('td');
      scoreCell.textContent = item.score + " out of " + questions.length;
      row.appendChild(scoreCell);
    });
  }
}






















 
  









