const quizData = [
    {
      question: 'What does the abbrevation HTML stands for?',
      options: ['Hyper Text Markup Language', 'High Text Markup Language', 'Hyper Text Markdown Language', 'None of the above'],
      answer: 'Hyper Text Markup Language',
    },
    {
      question: 'How many sizes of headers are available inHTML by default?',
      options: ['3', '4', '6', '5'],
      answer: '6',
    },
    {
      question: 'What is the smallest header in HTML by default?',
      options: ['h6', 'h1', 'h4', 'h3'],
      answer: 'h6',
    },
    {
      question: 'How to create an ordered list in HTML?',
      options: ['<li>', '<ol>', '<br>', '<href>'],
      answer: '<ol>',
    },
    {
      question: 'we enclose HTML tags with in?',
      options: [
        '{}',
        '<>',
        '!!',
        'None of the above',
      ],
      answer: '<>',
    },
    {
      question: 'How to display preformatted text in HTML?',
      options: ['<P>', '<hr>', '<pre>', '<a>'],
      answer: '<pre>',
    },
    {
      question: 'Which of the following properties is used to change the font of text? ',
      options: [
        'font-family',
        'font-size',
        'text-align',
        'None of the above',
      ],
      answer: 'font-family',
    },
    {
      question: 'How are quotations defined in HTML?',
      options: ['<quote>', '<blockquote>', '<block>', 'None of the above'],
      answer: '<blockquote>',
    },
    {
      question: 'Colors are defined in HTML using?',
      options: [
        'RGB values',
        'RGBA values',
        'HEX values',
        'All the above',
      ],
      answer:'All the above',
    },
    {
      question: 'Which property is used to set colors in HTML?',
      options: ['font-color', 'color', 'text-color', 'background-color'],
      answer: 'color',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();