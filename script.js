window.onload = function () {
    const startBtn = document.getElementById("startBtn");
    const answerBtn = document.getElementById("answerBtn");
    const questionEl = document.getElementById("question");
    const timerEl = document.getElementById("timer");
    const gameOverEl = document.getElementById("gameOver");
    const finalScoreEl = document.getElementById("finalScore");
    const saveBtn = document.getElementById("saveBtn");
    const initialsEl = document.getElementById("initials");

    let timeLeft = 60;
    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [{
        question: "What is a variable?",
        answers: [
            "A value that can change",
            "A value that cannot change",
            "A set of instructions",
            "A container for data"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "What is a function?",
        answers: [
            "A block of code that performs a specific task",
            "A set of instructions",
            "A collection of values",
            "A container for data"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "What is an object?",
        answers: [
            "A collection of properties and methods",
            "A set of instructions",
            "A collection of values",
            "A container for data"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "What is a loop?",
        answers: [
            "A block of code that is repeated multiple times",
            "A block of code that runs only once",
            "A set of instructions",
            "A collection of values"
        ],
        correctAnswerIndex: 0
    },
    {
        question: "What is an event?",
        answers: [
            "An action or occurrence detected by the program",
            "A set of instructions",
            "A collection of values",
            "A container for data"
        ],
        correctAnswerIndex: 0
    },
    ];


    startBtn.addEventListener("click", startGame);
    saveBtn.addEventListener("click", saveScore);


    console.log(questions.length);

    function startGame() {

        score = 0;

        console.log("Start button clicked");
        startBtn.style.display = "none";
        questionEl.style.display = "block";
        answerBtn.style.display = "block";
        timerEl.style.display = "block";

        setTime();
        showQuestion();
    }

    function setTime() {
        const interval = setInterval(function () {
            timeLeft--;
            timerEl.textContent = `Time: ${timeLeft}`;

            if (timeLeft === 0) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }


    function showQuestion() {
        const currentQuestion = questions[currentQuestionIndex];

        if (!currentQuestion) {
            console.error("currentQuestion not found");
            endGame();
            return;
        }

        if (!questionEl) {
            console.error("question element not found");
            return;
        }

        questionEl.textContent = currentQuestion.question;
        answerBtn.innerHTML = "";

        currentQuestion.answers.forEach((answer, index) => {
            const answerBtn = document.createElement("button");
            answerBtn.textContent = answer;
            answerBtn.onclick = function () {
                checkAnswer(index);
            };
            answerBtn.classList.add("answer-btn");
            answerBtn.style.display = "block";
            answerBtn.style.margin = "10px 0";
            document.getElementById("answerBtn").appendChild(answerBtn);
        });
    }




    function checkAnswer(selectedAnswerIndex) {
        if (currentQuestionIndex >= questions.length) {
            endGame();
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];

        if (selectedAnswerIndex === currentQuestion.correctAnswerIndex) {
            score++;
        } else {
            timeLeft -= 10;
        }

        currentQuestionIndex = currentQuestionIndex + 1;
        console.log(currentQuestionIndex);
        showQuestion();
    }

    function endGame() {
        questionEl.style.display = "none";
        answerBtn.style.display = "none";
        timerEl.style.display = "none";
        gameOverEl.style.display = "block";

        finalScoreEl.textContent = `Your final score is ${score}`;
    }

    function saveScore() {
        const initials = initialsEl.value;
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        highScores.push({
            initials,
            score
        });

        localStorage.setItem("highScores", JSON.stringify(highScores));

    }
}
