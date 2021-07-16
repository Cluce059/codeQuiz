//first, update the innerhtml of quiz elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const scoreContainer = document.getElementById("score-container");

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
//need to loop and increment questionindex and call renderQuestion
var questionIndex = 0;
    //called from start and every time there is another questin left unless time runs out
function questionRender(){
    var q = questions[questionIndex];
    question.innerHTML ="<p>" +q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
};

// quiz time limit in seconds initialized to 60
var count = 60;

//timer countdown function
function counterRender(){
    //if time is left, check answers to see if we need to subtract time 
    if(count >= 0){
        counter.innerHTML = ("Time remaining: " + count);
        count --;
        //call itself again if still runnning quiz
        setTimeout("counterRender()", 1000);
    }
    else{
        scoreRender();
    }
    //when timer reaches zero
};

//setTimeout("counterRender()",1000);//dont call this twice or it will process at double speed

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
    }
    else{
        console.log("wronge");
        //if incorrect, minus 10 sex 4 u ;P
        count -= 10;
    }
    //check if there are more questions before proceeding
    if(questionIndex < lastQuestionIndex){
        questionIndex ++;
        questionRender();
    }
    //if was the last question bring up the score
    else{
        scoreRender();
    }
};

//event listener for start button, calling startquiz when clicked
start.addEventListener("click", startQuiz); 

//start quiz function
function startQuiz(){
    start.style.display ="none";
    counterRender();
    //calls counterREnder every second: moved to counterrender for testing
    //TIMER = setInterval(counterRender,1000);
    //pull up the first question
    questionRender();
    quiz.style.display = "block";
};

//function to render score after last question
function scoreRender(){
    var scoreContainer = document.getElementById("score-container");
    //add score conatiner to inner html to change when score changes
    scoreContainer.style.display ="block";
    //use finascore l8r to add to locastorage
    var finalScore = count+1; //bc >= will stop at 0 and record score as -1 
    scoreContainer.innerHTML = ("Final score: " + finalScore);
    saveScore(finalScore);
};


//using same variable name for convinience but finalscore is NOT global fyi 
function saveScore(finalScore){
    //need to wipe questions from the visible dom
    question.innerHTML = "";
    choiceA.innerHTML = "";
    choiceB.innerHTML = "";
    choiceC.innerHTML = "";
    var finalPage = document.getElementById("score-page");
    finalPage.style.display = "block";
    //load username input els into dom
    finalPage.innerHTML = ("<h1 class ='done-container'>" +"All Done!" + "</h1>" + "<p>" + "Enter your username!" + "</p>");
    finalPage.innerHTML = ("<input type = 'text' name = 'username-input' class = 'text-input' placeholder='Enter a username to save your score!'/>");
     //make save button
    var saveButtonEl = document.createElement("button");
    saveButtonEl.textContent ="Save";
    saveButtonEl.className = "btn save-btn";
    
    var usernameInput = document.querySelector("input[name='username-input']").value.trim; 
    //use [] to select attribute of an html element
    console.log(usernameInput);

    //check if input is empty string
    if(!usernameInput){
        //return to startgame
        startQuiz();
        //return false; debug to see if needed
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
