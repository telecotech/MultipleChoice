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
document.getElementById('start-button').style.display = 'none';
  showQuestion();
});

function showQuestion() {
  var question = questions[currentQuestion];
  document.getElementById("questions").textContent = question.question;
  var choices = document.getElementById("choices");
  choices.innerHTML = "";
  for (var i = 0; i < question.choices.length; i++) {
    var choice = question.choices[i];
    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "choice";
    radio.value = choice;
    radio.addEventListener("click", handleAnswer);
    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice));
    choices.appendChild(label);
  }
}


function handleAnswer() {
  const selectedOption = document.querySelector('input[type="radio"]:checked');
  
  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }
  const answer = selectedOption.value;
  if (answer === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion === questions.length) {
    displayResult();
  } 
  else {
    showQuestion();
  }
}

function displayResult() {
  document.getElementById('question-container').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('score').textContent = score;
  document.getElementById('total').textContent = questions.length;

  // Create a form to submit the name and score
  var form = document.createElement('form');
  form.addEventListener('submit', submitForm);
  var nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name: ';
  var nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.name = 'name';
  var scoreInput = document.createElement('input');
  scoreInput.type = 'hidden';
  scoreInput.name = 'score';
  scoreInput.value = score;
  var submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';

  
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(scoreInput);
  form.appendChild(submitButton);

  
  document.getElementById('results').appendChild(form);

  document.getElementById('reset-button').addEventListener('click', resetQuiz);
}

function submitForm(event) {
  event.preventDefault();
  var name = event.target.elements.name.value;
  var score = event.target.elements.score.value;
  console.log(name, score);
  
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  document.getElementById('question-container').style.display = 'block';
  document.getElementById('results').style.display = 'none';
  showQuestion();
}

window.location.href = 'results.html?name=' + encodeURIComponent(name) + '&score=' + encodeURIComponent(score);


