var questions = [
     {
          title: "Commonly used data types DO NOT Include:",
          choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
          answer: "3. alerts"
     },
     {
          title: "The condition in an if / else statement is enclosed with ________.",
          choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
          answer: "2. curly brackets"
     },
     {
          title: "Arrays in JavaScript can be used to store ________.",
          choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
          answer: "4. all of the above"
     },
     {
          title: "String values must be enclosed within ________ when being assigned to variables",
          choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
          answer: "3. quotes"
     },
     {
          title: "A very useful tool used during development and debugging for printing content to the debugger is:",
          choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
          answer: "4. console.log"
     },
]

// current question index location
var questionNum = 0;
// current score
var correctCount = 0;
// deducted when player answers question incorrect
var penalty = -10;
// set initial timer to 75sec and first question
var timer = 75;
// location for quiz options/choices
var optionListEl = document.querySelector("#quiz-choices");
// location where "correct!" on "wrong!" displays
var questionResultEl = document.querySelector("#question-result");

// when user clicks sumbit, start countdown timer and display first question
document.getElementById("quiz-btn").addEventListener("click", function () {
     var startCountdown = setInterval(function () {
          document.getElementById("time").innerHTML = "Time: " + timer;
          timer--;

          if (timer === 0) {
               document.getElementById("time").innerHTML = "Time is up!";
               clearInterval(startCountdown);
          }
     }, 1000);
     qDisplay(questionNum);
});

// Display first question
function qDisplay(questionNum) {
     // Clears existing data 
     document.getElementById("quiz-area").innerHTML = "";
    
     // create h1 for question title
     var createQuestion = document.createElement("h1");
     var questionText = document.createTextNode(questions[questionNum].title);
     createQuestion.appendChild(questionText);
     document.getElementById("quiz-area").appendChild(createQuestion);
     var ulCreate = document.createElement("ul");
     ulCreate.className = "ulStyle";

     for (var i = 0; i < questions.length; i++) {
          document.getElementById("quiz-area").appendChild(ulCreate);
          var answerChoices = questions[i].choices;
     }
   
     // question answer choices
     answerChoices.forEach(function (newItem) {
          var listItem = document.createElement("li");
          var btnChoice = document.createElement("button");
          btnChoice.textContent = newItem;
          btnChoice.className = "btn btn-lg quiz-start text-left";
          listItem.appendChild(btnChoice);
          ulCreate.appendChild(listItem);
     });
};

function nextQuestion() {
     questionNum++;
     qDisplay();
}

function answerCheck(event) {
     console.log("answerCheck");
     if (event.target.matches("li")) {
          var answer = event.target.textContent;
          if (answer === questions[questionNum].answer) {
               questionResultEl.textContent = "Correct!";
               correctCount++;
          } else {
               questionResultEl.textContent = "Wrong!";
               timer = timer + penalty;
          }
     }   
     setTimeout(nextQuestion, 2000);
};

optionListEl.addEventListener("click", answerCheck);
