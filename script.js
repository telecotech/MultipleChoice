var currentQuestion = 0;
var score = 0;
var questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "New York"],
    answer: "Paris"
  },
  {
    question: "What is the largest country in the world?",
    choices: ["United States", "Russia", "China"],
    answer: "Russia"
  },
  {
    question: "What is the currency of Japan?",
    choices: ["Yuan", "Yen", "Won"],
    answer: "Yen"
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Mount Everest", "K2", "Kangchenjunga"],
    answer: "Mount Everest"
  },
  {
    question: "What is the smallest country in the world?",
    choices: ["Monaco", "Vatican City", "Nauru"],
    answer: "Vatican City"
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
    displayResult();
  } else {
    showQuestion();
  }
}


function displayResult() {
 
  var totalQuestions = questions.length;

  
  var percentageScore = Math.round((score / totalQuestions) * 100);

 
  var urlParams = new URLSearchParams(window.location.search);
  var name = urlParams.get('name');

  
  var resultMessage = "Congratulations " + name + "! You scored " + score + " out of " + totalQuestions + " (" + percentageScore + "%).";

  
  document.getElementById("result").innerHTML = resultMessage;
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';
}

function displayResult() {
  // Prompt the user for their initials
  var initials = prompt("Please enter your initials:");

  // Create a new object with the score and initials
  var scoreObject = { score: score, initials: initials };

  // Add the object to the saved scores
  savedScores.push(scoreObject);
  saveScores();

  // Display the score and saved scores
  var totalQuestions = questions.length;
  var percentageScore = Math.round((score / totalQuestions) * 100);
  var resultMessage = "Congratulations " + name + "! You scored " + score + " out of " + totalQuestions + " (" + percentageScore + "%).";
  document.getElementById("result").innerHTML = resultMessage;
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('result-container').style.display = 'block';

  displayScores();
}

// function saveScore(name, score, percentageScore) {
//   var scoreTable = document.getElementById("score-table");
//   var newRow = scoreTable.insertRow(-1);
//   var nameCell = newRow.insertCell(0);
//   var scoreCell = newRow.insertCell(1);
//   var percentageCell = newRow.insertCell(2);
//   nameCell.innerHTML = name;
//   scoreCell.innerHTML = score;
//   percentageCell.innerHTML = percentageScore + "%";
//   var html = scoreTable.outerHTML;
//   var file = new File([html], "scores.html", {type: "text/html"});
//   var url = URL.createObjectURL(file);
//   var link = document.createElement("a");
//   link.href = url;
//   link.download = "scores.html";
//   link.click();
// }
function saveScore(initials, score) {

  var newScore = { initials: initials, score: score };

  
  scores.push(newScore);

 
  localStorage.setItem('scores', JSON.stringify(scores));

 
  window.location.href = 'scores.html';
}

function displayScores() {
  var scoreTable = document.createElement('table');
  var tableHeader = scoreTable.insertRow();
  tableHeader.innerHTML = '<th>Initials</th><th>Score</th>';

  for (var i = 0; i < savedScores.length; i++) {
    var score = savedScores[i];
    var row = scoreTable.insertRow();
    row.innerHTML = '<td>' + score.initials + '</td><td>' + score.score + '</td>';
  }

  document.getElementById('score-container').innerHTML = '';
  document.getElementById('score-container').appendChild(scoreTable);
  document.getElementById('score-container').style.display = 'block';
}







