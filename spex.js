const questions = [
  {
    question: "color",
    answers: ["Blue", "Red", "Green", "Black", "White"],
    prices: [1000, 1500, 1200, 800, 1100]
  },
  {
    question: "spoiler",
    answers: ["Low Drag", "Exposed Carbon", "GT"],
    prices: [800, 100, 2000]
  },
  {
    question: "heated seats",
    answers: ["Add"],
    prices: [800]
  },
  {
    question: "cup holders",
    answers: ["Add"],
    prices: [450]
  }
];

const selectedAnswers = [];

function updateTotalPrice(selectedAnswers) {
  let totalPrice = 0;
  selectedAnswers.forEach((answerIndex, questionIndex) => {
    if (answerIndex !== undefined) {
      totalPrice += questions[questionIndex].prices[answerIndex];
    }
  });

  const totalPriceElement = document.getElementById("totalPrice");
  totalPriceElement.textContent = `$${totalPrice}`;
}

function createQuestionElements() {
  const questionsContainer = document.querySelector(".questions-container");

  questions.forEach((question, questionIndex) => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = `<h2>${question.question}</h2>`;

    question.answers.forEach((answer, answerIndex) => {
      const answerElement = document.createElement("div");
      answerElement.classList.add("answers");

      const button = document.createElement("button");
      button.classList.add("plus-btn");
      button.textContent = "+";
      button.onclick = () => toggleButton(questionIndex, answerIndex);

      const span = document.createElement("span");
      span.textContent = answer;

      answerElement.appendChild(button);
      answerElement.appendChild(span);
      questionElement.appendChild(answerElement);
    });

    questionsContainer.appendChild(questionElement);
  });
}

function toggleButton(questionIndex, answerIndex) {
  const button = document.querySelector(
    `.question:nth-child(${questionIndex + 1}) .answers:nth-child(${answerIndex + 1}) .plus-btn`
  );

  if (selectedAnswers[questionIndex] === answerIndex) {
    button.textContent = "+";
    selectedAnswers[questionIndex] = undefined;
  } else {
    // Reset all buttons for this question to "+"
    const allButtons = document.querySelectorAll(
      `.question:nth-child(${questionIndex + 1}) .plus-btn`
    );
    allButtons.forEach((btn) => (btn.textContent = "+"));

    button.textContent = "-";
    selectedAnswers[questionIndex + 1] = answerIndex;
  }

  updateTotalPrice(selectedAnswers);
}

createQuestionElements();
