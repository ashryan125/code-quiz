var buttonEl = document.querySelector("#quiz-btn");


// when user clicks sumbit

buttonEl.addEventListener("click", function() {
     alert("button clicked");
});

// set initial timer to 75sec and first question

var timer = 75;
var countdown = function() {
     timer--;
     if(timer === 0){
          clearInterval(startCountdown);
     }
};

var startCountdown = setInterval(countdown, 1000);

// selecting answer will change screen to next question
// underneath answers will let used know if they chose the right or wrong answer

// wrong answers will deduct 10sec from timer

// when quiz is complete, heading with "All done" "final score: " "enter initals" <text input> <submit>
// submit takes to high score page and lists initials from localStorage

// highscores page to list "Highscores", list of current highscores. Two buttons "go back" "clear high scores"