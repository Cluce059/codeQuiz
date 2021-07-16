//first, update the innerhtml of quiz elements
const start = document.getElementById("start");
const timer = document.getElementById("timer");
const timerCounter = document.getElementById("timer-counter");
const alert =document.getElementById("alert");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const scoreContainer = document.getElementById("score-container");
// quiz time limit in seconds initialized to 60
var count = 60;
//need to loop and increment questionindex and call renderQuestion
var questionIndex = 0;
//called from start and every time there is another questin left unless time runs out
//questions arr[] to access questions via index
var questions = [
    //each el will be an obj of itself with a question, img, and 3 choices
    {
        question: "What does HTML stand for?",
        choiceA: "Have Too Many Loofas",
        choiceB: "Hard To Make Love",
        choiceC: "Click here for testing correct",
        correct: "C"
    },
    {
        question: "What's my name?",
        choiceA: "Dunkaccino",
        choiceB: "DMX",
        choiceC: "Click here for testing correct",
        correct: "C"
    },
    {
        question: "Why?",
        choiceA: "Click here for testing correct",
        choiceB: "How?",
        choiceC: "hdkabfuiso",
        correct: "A"
    }
];
const lastQuestionIndex = (questions.length - 1);

function questionRender(){
    var q = questions[questionIndex];
    question.innerHTML ="<p>" +q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

//sos
function time(){
    var timerInterval = setTimeout(function(){
        count --;
    }, 1000);
};

//timer countdown function
function counterRender(){
    //if time is left, check answers to see if we need to subtract time 
    if(count >= 0){
        time();
        count --;
        //call itself again if still runnning quiz
    }
    else{        
        scoreRender();
        return false;
    }
};

//event listener for if user clicks an answer then call function to check it
choices.addEventListener("click", answerHandler);

//checkanswer function that takes user's input from event listeners
function answerHandler (event){
    event.preventDefault();
    //if user picks corrrect choice
    var targetChoice = event.target.id;
    //if correct move onto next question
    if(targetChoice === questions[questionIndex].correct){
        console.log(targetChoice);
        alert.innerText= "Correct";
    }
    else{
        alert.innerHTML= "Incorrect";
        //if incorrect, minus 10 sex 4 u ;P
        count -= 10;
        console.log(timer);
        //timer.innerHTML = count;
    }
    setTimeout(function(){
        alert.innerHTML = "";}, 1000)
    //check if there are more questions before proceeding
    if(questionIndex < lastQuestionIndex){
        questionIndex ++;
        questionRender();
    }
    //if was the last question bring up the score
    else{
        //clearTimeout(TIMER);
        scoreRender();
    }
};

//start quiz function
function startQuiz(){
    start.style.display ="none";
    quiz.style.display = "block";
    //pull up the first question
    questionRender();
    time();
};

//event listener for start button, calling startquiz when clicked
start.addEventListener("click", startQuiz); 

//function to render score after last question
function scoreRender(){
    var scoreContainer = document.getElementById("score-container");
    //add score conatiner to inner html to change when score changes
    scoreContainer.style.display ="block";
    //use finascore l8r to add to locastorage
    var finalScore = count+1; //bc >= will stop at 0 and record score as -1 
    scoreContainer.innerHTML = ("Final score: " + finalScore);
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
    finalPage.style.display = "block";
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

//using same variable name for convinience but finalscore is NOT global fyi 
//function to save finalscore to localstorage
function saveScore(finalScore, usernameInput){
    //use [] to select attribute of an html element
    //check if input is empty string
    if(!usernameInput){
        //return to startgame
        startQuiz();
        //return false; debug to see if needed
    }
    else{
        localStorage.setItem("finalScore", JSON.stringify(finalScore));
        localStorage.setItem("usernameInput", JSON.stringify(usernameInput));
    }
    //make an array thatll have to be parsed (bc only strings are stored in locastorage)
    var score={
        score: finalScore,
        name: usernameInput
    }
    
};

//TO DO:
//- still gotta wipe the count off the page too
// - end quiz at last question...still loops when done:/
//display high scores on a page at the end
