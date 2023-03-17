const quizQuestions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            { text: "Strings", correct: false },
            { text: "Booleans", correct: false },
            { text: "Alerts", correct: true },
            { text: "Numbers", correct: false },
        ],
        points: 20
    },
    {
        question: "The condition in an if / else statement is enclosed with __________.",
        answers: [
            { text: "Quotes", correct: false },
            { text: "Curly Brackets", correct: false },
            { text: "Parenthesis", correct: true },
            { text: "Square Brackets", correct: false },
        ],
        points: 20
    },
    {
        question: "Arrays in JavaScript can be used to store _________.",
        answers: [
            { text: "Numbers and Strings", correct: false },
            { text: "Other Arrays", correct: false },
            { text: "Booleans", correct: false },
            { text: "All of the above.", correct: true },
        ],
        points: 20
    },
    {
        question: "String values must be enclosed within ________ when being assigned to variables.",
        answers: [
            { text: "Commas", correct: false },
            { text: "Curly Brackets", correct: false },
            { text: "Quotes", correct: true },
            { text: "Parenthesis", correct: false },
        ],
        points: 20
    },
    {
        question: "A very useful tool used during developemnt and debugging for printing content to the debugger is:",
        answers: [
            { text: "JavaScript", correct: false },
            { text: "Terminal/Bash", correct: false },
            { text: "For Loops", correct: false },
            { text: "console.log", correct: true },
        ],
        points: 20
    },
];

let currentQuestionIndex = 0;
let timeLeft = 100;
let score = 0;
let countdown;

const startButton = document.getElementById("start-button");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const timeLeftElement = document.getElementById("time-remaining");
const highScoresList = document.getElementById("high-scores");
const highScoresButton = document.getElementById("high-scores-button");

startButton.addEventListener("click", startQuiz);
highScoresButton.addEventListener("click", displayHighScores);  

function startQuiz() {
    startButton.classList.add("hide");
    displayQuestion();
    startTimer();
}

function displayQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answerButtonsElement.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("button");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score += quizQuestions[currentQuestionIndex].points;
    } else {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    let countdown = setInterval(function() {
        timeLeft--;
        timeLeftElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdown);
            endQuiz();
        }
    }, 1000);
}

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    
    highScores.sort((a, b) => b.score - a.score);

    const highScoresListHTML = highScores.map(
        score => `<li>${score.initials} - ${score.score}</li>`
    ).join("");

    highScoresList.innerHTML = highScoresListHTML;
}

function endQuiz() {
    clearInterval(countdown);
    document.body.innerHTML = `
        <h2>All done!</h2>
        <p>Your final score is ${score}.</p>
        <form>
            <label for="initials">Enter initials:</label>
            <input type="text" id="initials" name="initials" required>
            <button id="submit-score" class="btn">Submit</button>
        </form>
    `;
    const submitButton = document.getElementById('submit-score');
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const initialsInput = document.getElementById('initials');
        const initials = initialsInput.value.toUpperCase();
        const scoreObject = {
            initials: initials,
            score: score
        };
        const highScoresArray = JSON.parse(localStorage.getItem('highScores')) || [];
        highScoresArray.push(scoreObject);
        localStorage.setItem('highScores', JSON.stringify(highScoresArray));
        displayHighScores();
    });
}



