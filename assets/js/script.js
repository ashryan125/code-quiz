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
var penalty = 10;
// set initial timer to 75sec and first question
var timer = 75;
// time left on clock
var timeLeft = 0;
// location for quiz options/choices
var optionListEl = document.querySelector("#quiz-choices");
// location where "correct!" on "wrong!" displays
var questionResultEl = document.querySelector("#question-result");
// store a variable of setInterval
var startCountdown;



// when user clicks sumbit, start countdown timer and display first question
document.getElementById("quiz-btn").addEventListener("click", function () {
     startCountdown = setInterval(function () {
          document.getElementById("time").innerHTML = "Time: " + timer;
          timer--;

          if (timer === 0) {
               document.getElementById("time").innerHTML = "Time is up!";
               clearInterval(startCountdown);
               setTimeout(quizComplete, 1000);
          }
     }, 1000);
     qDisplay(questionNum);
});

// Display first question
function qDisplay() {
     // Clears existing data 
     document.getElementById("quiz-area").innerHTML = "";
     optionListEl.innerHTML = "";
     // create h1 for question title
     var createQuestion = document.createElement("h1");
     createQuestion.setAttribute("class", "questionTitle");
     var questionText = document.createTextNode(questions[questionNum].title);
     createQuestion.appendChild(questionText);
     document.getElementById("quiz-area").appendChild(createQuestion);

     var choices = questions[questionNum].choices;
     var choicesLength = choices.length;

     for (var i = 0; i < choices.length; i++) {
          var listItem = document.createElement("li");
          var btnChoice = document.createElement("button");
          btnChoice.textContent = choices[i];
          btnChoice.className = "btn btn-lg quiz-start btn-width text-left";
          listItem.appendChild(btnChoice);
          optionListEl.appendChild(listItem);
     }
};

function nextQuestion() {
     questionNum++;

     if (questionNum >= questions.length) {
          clearInterval(startCountdown);
          quizComplete();
     } else {
          qDisplay();
     }
}



function answerCheck(event) {
     questionResultEl.classList.add('answerCheckStyle');
     if (event.target.matches("button")) {
          var answer = event.target.textContent;
          if (answer === questions[questionNum].answer) {
               questionResultEl.textContent = "Correct!";
               correctCount++;
          } else {
               questionResultEl.textContent = "Wrong!";
               timer-=10;
          }
     }

     setTimeout(nextQuestion, 1500);

};

optionListEl.addEventListener("click", answerCheck);

var quizComplete = function () {
     // clear page
     questionResultEl.classList.remove('answerCheckStyle');
     document.getElementById("quiz-area").innerHTML = "";
     optionListEl.innerHTML = "";
     document.getElementById("question-result").innerHTML = "";

     // create div for styling
     var divEl = document.createElement("div");
     divEl.setAttribute("id", "completeDiv");

     document.getElementById("quiz-area").appendChild(divEl);

     // create h1
     var h1 = document.createElement("h1");
     h1.setAttribute("id", "allDone");
     h1.textContent = "All done!";

     document.getElementById("completeDiv").appendChild(h1);

     // display score
     var finalScore = document.createElement("p");
     finalScore.setAttribute("id", "finalScore");
     var totalScore = correctCount + timer;
     finalScore.textContent = "Your final score is " + totalScore;

     document.getElementById("completeDiv").appendChild(finalScore);

     // inital input
     var createLabel = document.createElement("label");
     createLabel.setAttribute("id", "createLabel");
     createLabel.textContent = "Enter your initials: ";

     document.getElementById("completeDiv").appendChild(createLabel);

     // input
     var createInput = document.createElement("input");
     createInput.setAttribute("type", "text");
     createInput.setAttribute("id", "initials");
     createInput.textContent = "";

     document.getElementById("completeDiv").appendChild(createInput);

     // submit
     var createSubmit = document.createElement("button");
     createSubmit.setAttribute("type", "submit");
     createSubmit.setAttribute("id", "Submit");
     createSubmit.setAttribute("class", "btn quiz-start btn-sm");
     createSubmit.textContent = "Submit";

     document.getElementById("completeDiv").appendChild(createSubmit);

     // Event listener to capture initials and local storage for initials and score
     createSubmit.addEventListener("click", function () {
          var initials = createInput.value;

          if (initials === null) {

               console.log("No value entered!");

          } else {
               var finalScore = {
                    initials: initials,
                    score: totalScore
               }
               console.log(finalScore);
               var allScores = localStorage.getItem("allScores");
               if (allScores === null) {
                    allScores = [];
               } else {
                    allScores = JSON.parse(allScores);
               }
               allScores.push(finalScore);
               var newScore = JSON.stringify(allScores);
               localStorage.setItem("allScores", newScore);
               // Travels to final page
               window.location.replace("./highscores.html");
          }
     });

};


