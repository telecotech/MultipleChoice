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
  } else {
    showQuestion();
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




