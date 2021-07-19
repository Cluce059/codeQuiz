//first, update the innerhtml of quiz elements
const start = document.getElementById("start");
const timer = document.getElementById("timer");
const alert =document.getElementById("alert");
const quiz = document.getElementById("quiz");
const scoreInput = document.getElementById("scoreInput");
const scores = document.getElementById("scores");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const scoreContainer = document.getElementById("score-container");
const highscoresEl = document.getElementById("highscores");
// quiz time limit in seconds initialized to 60
var count = 60;
var score = 0;
//create an empty arr to hold the highscores that have to be stringified to get in localstorage anyway
var highscores = [];
//need to loop and increment questionindex and call renderQuestion
var questionIndex = 0;
var timerInterval;
//called from start and every time there is another questin left unless time runs out
//questions arr[] to access questions via index
var questions = [
    //each el will be an obj of itself with a question, img, and 3 choices
    {
        question: "What does HTML stand for?",
        choiceA: "Have Too Many Loofas",
        choiceB: "Hard To Manage Loofas",
        choiceC: "Hyper Text Markup Language",
        correct: "C"
    },
    {
        question: "What do you use to enclose array content?",
        choiceA: "{}",
        choiceB: "()",
        choiceC: "[]",
        correct: "C"
    },
    {
        question: "How can you select a DOM element, or any element, using javascript?",
        choiceA: "getElementByID method",
        choiceB: "getItemByClass method",
        choiceC: "select it with your cursor method",
        correct: "A"
    }
];
const lastQuestionIndex = (questions.length - 1);

//function ti start timercountdown
var timeElapsed = 0;
function timeStart(){
    timer.textContent = count;
    //console.log(count);
    timerInterval = setInterval(function(){
        timeElapsed ++;
        timer.textContent = count - timeElapsed;
        if(timeElapsed >= count){
            questionIndex = questions.length;
            nextQuestion();
        }
    }, 1000);
};

//stops timer
function stopTimer(){
    clearInterval(timerInterval);
};

//next question to handle when timer stops
function nextQuestion(){
    questionIndex ++;
    if(questionIndex < questions.length){
        questionRender();
    }
    else{
        stopTimer();
        if((count - timeElapsed) > 0){
            //set score = current time
            score += (count -timeElapsed);
            console.log("use score of correct" + score);
        }
            //get rid of quiz bc it has ended
            scoreRender();
            display(scoreInput);
            timer.textContent = 0;
    }
};

//checkanswer function that takes user's input from event listeners
function answerHandler (event){
    event.preventDefault();
    //if user picks corrrect choice
    var targetChoice = event.target.id;
    //if correct move onto next question
    if(targetChoice === questions[questionIndex].correct){
        displayMessage("Correct"); 
    }
    else{
        displayMessage("Incorrect");
        //if incorrect, minus 10 sex 4 u ;P
        count -= 10;
        //console.log(count);
        //timer.innerHTML = count;
    }
    //check if there are more questions before proceeding
    if(questionIndex < lastQuestionIndex){
        questionIndex ++;
        questionRender();
    }
    //if was the last question bring up the score
    else{
        stopTimer();
        scoreRender();
    }
};

//start quiz function
function startQuiz(){
    //get rid of start..
    hide(start);
    //and bring in the quiz content
    display(quiz);
    //pull up the first question
    questionRender();
    timeStart();
};
//function to reset the game if user choses to play again
function reset(){
    finalScore = 0;
    questionIndex = 0;
    timeElapsed = 0;
    timer = 0;
};

///////////////////////////////////RENDERING FUNCTIONS///////////////////////////////////

//tells user if theyre right or not
function displayMessage(message) {
    //create msg div and hr to make msg vidually seperate from quiz content ie <ht. tag
    var messageHr = document.createElement("hr");
    var messageEl = document.createElement("div");
    messageEl.textContent =message;
    //append msg to end of quiz content w line ... for 3 seconds only
    document.querySelector(".quiz").appendChild(messageHr);
    document.querySelector(".quiz").appendChild(messageEl);
    setTimeout(function () {
        messageHr.remove();
        messageEl.remove();
    }, 3000);
};

function questionRender(){
    var q = questions[questionIndex];
    question.innerHTML ="<p>" +q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

//function to load end page
function endPage(finalScore){
    //need to wipe questions from the visible dom
    counter.remove();
    question.remove();
    choiceA.remove();
    choiceB.remove();
    choiceC.remove();
    //clear counter interval
    var finalPage = document.getElementById("score-page");
    display(finalPage);
    //load username input els into dom
    finalPage.innerHTML = ("<h1 class ='done-container'>" +"All Done!" + "</h1>" + "<p>"
     + "Enter your username!" + "</p>");
    finalPage.innerHTML = ("<input type = 'text' name = 'username-input' class = 'text-input' placeholder='Enter a username:'/>");
    //store usernmae in a variable
    ///var usernameInput = document.querySelector("input[name='username-input']").value.trim; 
    //finalPage.innerHTML = ("<button class = 'btn save-btn'>" + "save" + "</button>");
    //make save button
    // var saveButtonEl = document.createElement("button");
    // saveButtonEl.textContent ="Save";
    // saveButtonEl.className = "btn save-btn";
    //save score to localstorage
    //saveButtonEl.addEventListener("click", saveScore(finalScore, usernameInput));
};

//function to display high scores
function scoreRender(){
    hide(quiz);
    display(highscoresEl);
    highscores = JSON.parse(localStorage.getItem("scores"));
    for(var i = 0; i < highscores.length; i++){
     var playerScore = document.createElement("div");
    playerScore.textContent = score;
    playerScore.textContent = highscores[i].username + highscores.userscore;
    highscores.appendChild(playerScore);
    }
};
//////////////////////event listeners/////////////////////////////
//event listener for if user clicks an answer then call function to check it
choices.addEventListener("click", answerHandler);
//event listener for start button, calling startquiz when clicked
start.addEventListener("click", startQuiz); 

//button to view all high scores
viewScores.addEventListener("click", function(){
    hide(quiz);
    display(scoreInput);
    scoreRender();
    stopTimer();
    reset();
});

initialsSubmit.addEventListener("click", function(){
    var initInitial = initials.val().trim();
    //if there is already ahs saved in localstorage
    if(initInitial){
        var userScore = {username:initInitial, userscore:score};
        initials.val = '';
        //picked up this trick from another code, p useful to have the empty arr option
        highscores = JSON.parse(localStorage.getItem("scores")) || [];
        highscores.push(userscore);
        localStorage.setItem("scores", JSON.stringify(highscores));
        hide(scoreInput);
        scoreRender();
        reset();
    }

})







//need these functions to handle the el appearances bc its too much to handle per function 
//hides element
function hide(element) {
    element.style.display = "none";
};

//displays element
function display(element) {
    element.style.display = "block";
};

