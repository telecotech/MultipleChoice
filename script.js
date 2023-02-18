let timeLeft = 60;
let currentQuestion = 0;
let quizStarted = false;

const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin"],
    correctAnswer: "Paris"
  },
  {
    question: "What is the largest country in the world by area?",
    answers: ["Russia", "China", "USA"],
    correctAnswer: "Russia"
  },
  {
    question: "What is the currency of Japan?",
    answers: ["Yen", "Dollar", "Pound"],
    correctAnswer: "Yen"
  }
];

function startQuiz() {
  quizStarted = true;
  displayQuestion();
  let timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timer").innerHTML = timeLeft + " seconds remaining";
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "Time's up!";
      document.querySelectorAll("button").forEach(button => button.disabled = true);
      document.getElementById("question-container").innerHTML = "";
      timeLeft = 60;
      currentQuestion = 0;
      quizStarted = false;
    }
  }, 1000);
}

function displayQuestion() {
  currentQuestion++;
  const questionContainer = document.getElementById("question-container");
  const question = questions[currentQuestion-1];
  questionContainer.innerHTML = `
    <div class="question">${question.question}</div>
    <div class="answers">
      ${question.answers.map(answer => `
        <button type="button" onclick="checkAnswer('${question.correctAnswer}')">
          ${answer}
        </button>
      `).join('')}
    </div>
  `;
}

function checkAnswer(correctAnswer) {
  if (correctAnswer === questions[currentQuestion-1].correctAnswer) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
  if (currentQuestion >= questions.length) {
    clearInterval(timer);
    document.getElementById("timer").innerHTML = "Quiz completed!";
    document.querySelectorAll("button").forEach(button => button.disabled = true);
    document.getElementById("question-container").innerHTML = "";
    document.getElementById("timer").innerHTML = "";
    timeLeft = 60;
    currentQuestion = 0;
    quizStarted = false;
  } else {
    displayQuestion();
  }
}