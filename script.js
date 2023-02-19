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



const fs = requires('fs');


const scores = {};

// convert the object to a JSON string
const jsonString = JSON.stringify(scores);

// write the JSON string to a file
fs.writeFile('JSON/scores.json', jsonString, err => {
  if (err) {
    console.log('Error writing file', err);
  } else {
    console.log('Successfully wrote file');
  }
});


























// function displayScores(scores) {
//     var scoreTable = document.createElement('table');
//     var tableHeader = scoreTable.insertRow();
//     tableHeader.innerHTML = '<th>Initials</th><th>Score</th>';
  
//     for (var i = 0; i < scores.length; i++) {
//       var score = scores[i];
//       var row = scoreTable.insertRow();
//       row.innerHTML = '<td>' + score.initials + '</td><td>' + score.score + '</td>';
//     }
  
//     document.getElementById('score-container').innerHTML = '';
//     document.getElementById('score-container').appendChild(scoreTable);
//     document.getElementById('score-container').style.display = 'block';
//   }
  
//   var savedScores = JSON.parse(localStorage.getItem('scores.html')) || [];
  
//   savedScores.sort(function(a, b) {
//     return b.score - a.score;
//   });
  










