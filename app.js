const questionNumber = document.querySelector(".question-number-p");
const questionText = document.querySelector(".question");
const optionContainer = document.querySelector(".option-container");
const answerIndicator = document.querySelector(".answer-indicator");
const answerNum = document.querySelector(".answer_Num");
const questionBox = document.querySelector(".question-box");
const resultBox = document.querySelector(".result-box");
const homeBox = document.querySelector(".home-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let wrongAnswers = 0;
let misClick = 0;

const setAvailableQuestions = () => {
  const totalQuiz = quiz.length;
  for (let i = 0; i < totalQuiz; i++) {
    availableQuestions.push(quiz[i]);
  }
};

const getNewQuestion = () => {
  questionNumber.innerHTML = `Question ${questionCounter + 1} of ${
    quiz.length
  }`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  questionText.innerHTML = currentQuestion.q;

  const index1 = availableQuestions.indexOf(currentQuestion);
  availableQuestions.splice(index1, 1);

  const optionLen = currentQuestion.options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(currentQuestion.options[i]);
  }

  optionContainer.innerHTML = "";
  let animationDelay = 0.2;
  for (let i = 0; i < availableOptions.length; i++) {
    const option = document.createElement("div");
    option.innerHTML = availableOptions[i];
    option.className = "option";
    option.id = i;
    option.style.animationDelay = animationDelay + "s";
    option.style.cursor = "pointer";
    animationDelay += 0.2;
    option.setAttribute("onclick", "getResult(this)");
    optionContainer.appendChild(option);
  }

  questionCounter += 1;
};

const getResult = (ele) => {
  const len = optionContainer.children.length;

  for (let i = 0; i < len; i++) {
    if (optionContainer.children[i].classList.contains("chosen") && !ele) {
      optionContainer.children[i].classList.remove("chosen");
      misClick += 1;
    }
  }
  ele.classList.add("chosen");

  if (parseInt(ele.id) !== currentQuestion.answer) {
    wrongAnswers += 1;
  } else {
    correctAnswers += 1;
  }
};

const next = () => {
  if (questionCounter === quiz.length) {
    console.log(misClick);
    quizOver();
  } else {
    availableOptions = [];
    getNewQuestion();
  }
};

const quizOver = () => {
  questionBox.classList.add("hide");
  resultBox.classList.remove("hide");
  quizResult();
};

const quizResult = () => {
  resultBox.querySelector(".attempt").innerHTML = correctAnswers + wrongAnswers;
  resultBox.querySelector(".table_correct").innerHTML = correctAnswers;
  resultBox.querySelector(".table_wrong").innerHTML = wrongAnswers;
  resultBox.querySelector(".percentage").innerHTML =
    (correctAnswers / quiz.length) * 100 + "%";

  resultBox.querySelector(
    ".tScore"
  ).innerHTML = ` ${correctAnswers} of ${quiz.length}`;
};

function reset() {
  questionCounter = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  availableOptions = [];
}

const tryAgain = () => {
  resultBox.classList.add("hide");
  questionBox.classList.remove("hide");
  reset();
  startQuiz();
};

const goHome = () => {
  homeBox.classList.remove("hide");
  questionBox.classList.add("hide");
  resultBox.classList.add("hide");
  reset();
};

const startQuiz = () => {
  homeBox.classList.add("hide");
  questionBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();
};
availableOptions = [];
answerNum.innerHTML = quiz.length;
