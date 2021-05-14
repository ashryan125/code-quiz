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

var questionNum = 0;
var penalty = -10;
// set initial timer to 75sec and first question
var timer = 75;


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
   
     // 5/13 - currently making 5 h1 and displaying text for first question
     for (var i = 0; i < questions.length; i++) {
          var createQuestion = document.createElement("h1");
          var questionText = document.createTextNode(questions[i].title);
          createQuestion.appendChild(questionText);
          document.getElementById("quiz-area").appendChild(createQuestion);
          var ulCreate = document.createElement("ul");
          ulCreate.className = "ulStyle";
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
          listItem.addEventListener("click", (compare));
     });
};

// Event to compare choices with answer
function compare(event) {
     var element = event.target;

     if (element.matches("li")) {

          var createDiv = document.createElement("div");
          createDiv.setAttribute("id", "createDiv");
          // Correct condition 
          if (element.textContent == questions[questionNum].answer) {
               score++;
               createDiv.textContent = "Correct! The answer is:  " + questions[questionNum].answer;
               // Correct condition 
          } else {

               // wrong answers will deduct 10sec from timer
               secondsLeft = secondsLeft - penalty;
               createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionNum].answer;
          }

     }
     // Question Index determines number question user is on
     questionNum++;

     if (questionNum >= questions.length) {
          // All done will append last page with user stats
          complete();
          createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
     } else {
          qDisplay(questionNum);
     }
     questionsDiv.appendChild(createDiv);

};

// All done will append last page
function complete() {
     questionsDiv.innerHTML = "";
     currentTime.innerHTML = "";

     // Heading:
     var createH1 = document.createElement("h1");
     createH1.setAttribute("id", "createH1");
     createH1.textContent = "All Done!"

     questionsDiv.appendChild(createH1);

     // Paragraph
     var createP = document.createElement("p");
     createP.setAttribute("id", "createP");

     questionsDiv.appendChild(createP);

     // Calculates time remaining and replaces it with score
     if (secondsLeft >= 0) {
          var timeRemaining = secondsLeft;
          var createP2 = document.createElement("p");
          clearInterval(startCountdown);
          createP.textContent = "Your final score is: " + timeRemaining;

          questionsDiv.appendChild(createP2);
     }

     // Label
     var createLabel = document.createElement("label");
     createLabel.setAttribute("id", "createLabel");
     createLabel.textContent = "Enter your initials: ";

     questionsDiv.appendChild(createLabel);

     // input
     var createInput = document.createElement("input");
     createInput.setAttribute("type", "text");
     createInput.setAttribute("id", "initials");
     createInput.textContent = "";

     questionsDiv.appendChild(createInput);

     // submit
     var createSubmit = document.createElement("button");
     createSubmit.setAttribute("type", "submit");
     createSubmit.setAttribute("id", "Submit");
     createSubmit.textContent = "Submit";

     questionsDiv.appendChild(createSubmit);

     // Event listener to capture initials and local storage for initials and score
     createSubmit.addEventListener("click", function () {
          var initials = createInput.value;

          if (initials === null) {

               console.log("No value entered!");

          } else {
               var finalScore = {
                    initials: initials,
                    score: timeRemaining
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
               window.location.replace("./HighScores.html");
          }
     });

}
