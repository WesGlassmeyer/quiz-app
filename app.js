const quiz = {
  questions: [
    {
      question: "What does Jiu-Jitsu translate to in English?",
      answers: ["Gentle Art", "Empty Hand", "The Foot & The Fist", "Wrastlin'"],
      correctAnswer: "Gentle Art",
    },
    {
      question: "What are the founding principles of Jiu-Jitsu?",
      answers: [
        "No Pain, No Fear, No Defeat",
        "Flexibility, Agility, and Momentum",
        "Be Fast, Be Strong, Be Powerful",
        "Street Applicability, Energy Efficiency, and Natural Movements",
      ],
      correctAnswer:
        "Street Applicability, Energy Efficiency, and Natural Movements",
    },
    {
      question: "Modern Jiu-Jitsu was created by which family?",
      answers: [
        "The Simpson Family",
        "The Gracie Family",
        "The Addams Family",
        "The Huxtable Family",
      ],
      correctAnswer: "The Gracie Family",
    },
    {
      question:
        'In 1993 Rorion Gracie created what "No Rules" fighting championship to prove the effectiveness of Jiu-Jitsu?',
      answers: [
        "Pride Fighting Championship",
        "World Wrestling Federation",
        "Ultimate Fighting Championship",
        "Bellator",
      ],
      correctAnswer: "Ultimate Fighting Championship",
    },
    {
      question: "What is the most common Jiu-Jitsu submission in MMA?",
      answers: [
        "Omoplata",
        "The Twister",
        "Five Finger Death Punch",
        "Rear Naked Choke",
      ],
      correctAnswer: "Rear Naked Choke",
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  checkedAnswerIsCorrect: true,
};

/********** TEMPLATE GENERATION FUNCTIONS **********/

function createWelcomePage() {
  return `
  <h2 class="h2">Jiu-Jitsu Quiz</h2>
  <div class="welcome">
  <p>Welcome to the Jiu-Jitsu quiz!</p>
  <p>Press the button below to begin.</p>
  </div>
  <button id="start-btn">Start Quiz</button>`;
}

function createQuizPage() {
  let questionNumber = quiz.questionNumber;
  return `<h2 class="h2">Jiu-Jitsu Quiz</h2>
  <h3>Question ${questionNumber + 1} of 5</h3>
  <form id="quiz-form">
    <h4>${quiz.questions[questionNumber].question}</h4>
    <ul class="radio-buttons" >
      <li>
    <input type="radio" name="answer" id="answer1" value="${
      quiz.questions[questionNumber].answers[0]
    }" checked="checked"/>
    <label for="answer1">${quiz.questions[questionNumber].answers[0]}</label>
    </li>
    <li>  
    <input type="radio" name="answer" id="answer2" value="${
      quiz.questions[questionNumber].answers[1]
    }">
    <label for="answer2">${quiz.questions[questionNumber].answers[1]}</label>
    </li>
    <li>
    <input type="radio" name="answer" id="answer3" value="${
      quiz.questions[questionNumber].answers[2]
    }">
    <label for="answer3">${quiz.questions[questionNumber].answers[2]}</label>
    </li>
    <li>
    <input type="radio" name="answer" id="answer4" value="${
      quiz.questions[questionNumber].answers[3]
    }">
    <label for="answer4">${quiz.questions[questionNumber].answers[3]}</label>
    </li>
    </ul>
    <button type="button" id="submit-answer-btn">Submit Answer</button>
   </form>`;
}

function createAnswerPage() {
  let questionNumber = quiz.questionNumber;
  const resultsMessage = {
    correct: `<p>That is correct!</p>`,
    incorrect: `<p>That is incorrect.</p><p>The correct answer is ${quiz.questions[questionNumber].correctAnswer}.</p>`,
  };

  let checkQuizForCorrect = quiz.checkedAnswerIsCorrect === true;

  const button = {
    next: `<button type="button" id="next-question-btn">Next Question</button>`,
    results: `<button type="button" id="see-results-btn">See Results</button>`,
  };

  let isLastQuestion = quiz.questionNumber + 1 === quiz.questions.length;

  return `<h2 class="h2">Jiu-Jitsu Quiz</h2>
  ${checkQuizForCorrect ? resultsMessage.correct : resultsMessage.incorrect}
  <h5>Your current score is ${quiz.score}/100</h5>
  ${isLastQuestion ? button.results : button.next}`;
}

function createResultsPage() {
  return `<h2 class="h2">Jiu-Jitsu Quiz</h2>
  <p>Congratulations! You finished the quiz!</p>
  <h5>Your final score is ${quiz.score}/100</h5>
  <button type="button" id="restart-quiz-btn">Restart Quiz</button>`;
}

/********** RENDER FUNCTION(S) **********/

function renderWelcomePage() {
  if (quiz.quizStarted === false) {
    return $("main").html(createWelcomePage());
  }
}

function renderQuizPage() {
  return $("main").html(createQuizPage());
}

function renderAnswerPage() {
  return $("main").html(createAnswerPage());
}

function renderResultsPage() {
  return $("main").html(createResultsPage());
}

/********** EVENT HANDLER FUNCTIONS **********/

function startQuiz() {
  $("main").on("click", "#start-btn", function (event) {
    quiz.quizStarted = true;
    renderQuizPage();
  });
}

function checkIfCorrect() {
  let questionNumber = quiz.questionNumber;
  let checkedButton = $(`input:radio[name="answer"]:checked`).val();
  let correctAnswer = quiz.questions[questionNumber].correctAnswer;

  if (checkedButton === correctAnswer) {
    quiz.score += 20;
    quiz.checkedAnswerIsCorrect = true;
  } else {
    quiz.checkedAnswerIsCorrect = false;
  }
}

function submitAnswer() {
  $("main").on("click", "#submit-answer-btn", function (event) {
    event.preventDefault();
    checkIfCorrect();
    renderAnswerPage();
  });
}

function nextQuestion() {
  $("main").on("click", "#next-question-btn", function (event) {
    if (quiz.questionNumber < 4) {
      quiz.questionNumber++;
    }
    renderQuizPage();
  });
}

function seeResults() {
  $("main").on("click", "#see-results-btn", function (event) {
    renderResultsPage();
  });
}

function restartQuiz() {
  $("main").on("click", "#restart-quiz-btn", function (event) {
    quiz.questionNumber = 0;
    quiz.quizStarted = false;
    renderWelcomePage();
  });
}

function initializePage() {
  renderWelcomePage();
  startQuiz();
  submitAnswer();
  nextQuestion();
  seeResults();
  restartQuiz();
}

$(initializePage);
