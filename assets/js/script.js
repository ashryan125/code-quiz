var questions = [
     {
          title: "Commonly used data types DO NOT Include:",
          choices: ["strings", "booleans", "alerts", "numbers"],
          answer: "alerts"
     },
     {
          title: "The condition in an if / else statement is enclosed with ________.",
          choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
          answer: "curly brackets"
     },
     {
          title: "Arrays in JavaScript can be used to store ________.",
          choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
          answer: "all of the above"
     },
     {
          title: "String values must be enclosed within ________ when being assigned to variables" ,
          choices: ["commas", "curly brackets", "quotes", "parenthesis"],
          answer: "quotes"
     },
     {
          title: "A very useful tool used during development and debugging for printing content to the debugger is:" ,
          choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
          answer: "console.log"
     },
]

var buttonEl = document.querySelector("#quiz-btn");

var score = 0;
var questionNum = 0;
var penalty = 10;
// set initial timer to 75sec and first question
var timer = 75;

var countdown = function() {
     timer--;
     if(timer === 0) {
          clearInterval(startCountdown);
     };
     console.log(timer);
}

var startCountdown = setInterval(countdown, 1000);
// when user clicks sumbit, start countdown timer and display first question

buttonEl.addEventListener("click", countdown);







// selecting answer will change screen to next question
// underneath answers will let used know if they chose the right or wrong answer

// wrong answers will deduct 10sec from timer

// when quiz is complete, heading with "All done" "final score: " "enter initals" <text input> <submit>
// submit takes to high score page and lists initials from localStorage

// highscores page to list "Highscores", list of current highscores. Two buttons "go back" "clear high scores"