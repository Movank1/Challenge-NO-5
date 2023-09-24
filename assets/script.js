// Gathering HTML elements 
var quizBody = document.getElementById("quiz");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameOverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var quizTimer = document.getElementById("timer");
var startQuizButton = document.getElementById("startbtn");
var startQuizDiv = document.getElementById("startpage");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initial");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");



// List of Quiz question 



var quizQuestions = [
    
    {
    question: "How many states USA has?",
    choiceA: "52",
    choiceB: "100",
    choiceC: "37",
    choiceD: "40",
    correctAnswer: "a"},
  {
    question: "Where is Rwanda located?",
    choiceA: "SADEC",
    choiceB: "BRICS",
    choiceC: "ECOWAS",
    choiceD: "EAC",
    correctAnswer: "d"},
   {
    question: "What is the name of obama dog?",
    choiceA: "Bella",
    choiceB: "Sunny",
    choiceC: "Lucy",
    choiceD: "Rea",
    correctAnswer: "b"},
    {
    question: "What of first computer?",
    choiceA: "ENIAC",
    choiceB: "laptop;",
    choiceC: "CSS;",
    choiceD: "Desktop;",
    correctAnswer: "a"},
    {
    question: "How many galaxies are there?",
    choiceA: "5",
    choiceB: "2",
    choiceC: "2 B",
    choiceD: "200 B",
    correctAnswer: "d"},  

        
    
    ];



// Time valiabler 
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 25;
var timerInterval = 5;
var score = 0;
var correct;


//function to generate Quiz

    function generateQuizQuestion(){
    gameOverDiv.style.display = "empty";
    if (currentQuestionIndex === finalQuestionIndex){
        return showScore();
    } 
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};




function startQuiz(){
    gameOverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizQuestion();

    //Timer
    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time left: " + timeLeft;

        
  
        if(timeLeft < 0) {
          clearInterval(timerInterval);
          showScore();
        }
      }, 1000);
    quizBody.style.display = "block";

    }

// The function to displays the score 

function showScore(){
    quizBody.style.display = "none"
    gameOverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = " You score is " + score + " out of " + quizQuestions.length + " correct!";
}

submitScoreBtn.addEventListener("click", function highscore(){
    
    
    if(highscoreInputName.value === "") {
        alert("Please enter the Name or initials");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
    
        gameOverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();

    }
    
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

// Function to display the high scores page while hiding all of the other pages 
function showHighscore(){
    startQuizDiv.style.display = "hide"
    gameOverDiv.style.display = "hide";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

// This function to clears the local storage of the  scores 
function clearScore(){
    window.localStorage.clear();
    highscoreDisplayName.textContent = "clear";
    highscoreDisplayScore.textContent = "clear";
}

// Function to replay the quiz
function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameOverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 25;
    score = 0;
    currentQuestionIndex = 0;
}

 // Function checks the answer 
 function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
       score++;
       alert("Correct!");
      
        currentQuestionIndex++;
        generateQuizQuestion();
        //display in the results div that the answer is correct.
    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){

      
   
       alert("Incorrect.")

/       
        currentQuestionIndex++;
        timeLeft = -5 + timeLeft;
        
        
        generateQuizQuestion();
        

    }

   
   else{
       showScore();
   }

}

// Starts the quiz button
startQuizButton.addEventListener("click",startQuiz);



