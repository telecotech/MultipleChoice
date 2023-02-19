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




 
  









