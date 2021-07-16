//first, update the innerhtml of quiz elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const counter = document.getElementById("counter");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const progress = document.getElementById("progress");
const scoreContainer = document.getElementById("score-container");


//questions arr[] to access questions via index
var questions = [
    //each el will be an obj of itself with a question, img, and 3 choices
    {
        question: "What does HTML stand for?",
        //imgSrc: //INSERT GOOFY IMGS HERE AND FOR EACH OBJ
        choiceA: "Have Too Many Loofas",
        choiceB: "Hard To Make Love",
        choiceC: "Click here for testing correct",
        correct: "C"
    },
    {
        question: "What's my name?",
        //imgSrc: //INSERT GOOFY IMGS HERE AND FOR EACH OBJ
        choiceA: "Dunkaccino",
        choiceB: "DMX",
        choiceC: "Click here for testing correct",
        correct: "C"
    },
    {
        question: "Why?",
        //imgSrc: //INSERT GOOFY IMGS HERE AND FOR EACH OBJ
        choiceA: "Click here for testing correct",
        choiceB: "How?",
        choiceC: "hdkabfuiso",
        correct: "A"
    }
];


const lastQuestionIndex = (questions.length - 1);
var questionIndex = 0;
//need to loop and increment questionindex and call renderQuestion

    //called from start and every time there is another questin left unless time runs out
function questionRender(){
    var q = questions[questionIndex];
    //qImg.innerHTML = "<img src=" + q.imgSrc + ">"; //UPDATE IMG HERE
    question.innerHTML ="<p>" +q.question + "</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    //increase question index for next ime it's called ???
    //q++;
};

// quiz time limit in seconds
var count = 60;
//timer countdown function
function counterRender(){
    //if time is left, check answers to see if we need to subtract time 
    while(count > 0){
        counter.innerHTML =count;
        count --;
    }
};

//event listener for if user clicks an answer then call function to check it
choices.addEventListener("click", answerHandler);
//checkanswer function that takes user's input
var score = 0;
function answerHandler (event){
    event.preventDefault();
    //add event listeners for each choice
    A.addEventListener("click");
    //if correct, update score and move onto next question
    //check if there are more questions before proceeding
    if(questionIndex < lastQuestionIndex){
        count =0 ;
        questionIndex ++;
        questionRender();
    }
    //if last question
    else{
        clearInterval(TIMER);
        scoreRender();
    }
};

//event listener for start button, calling startquiz when clicked
start.addEventListener("click", startQuiz); 
var TIMER;
//start quiz function
function startQuiz(){
    start.style.display ="none";
    counterRender();
    //calls counterREnder every second
    TIMER = setInterval(counterRender,1000);
    //pull up the first question
    questionRender();
    quiz.style.display = "block";
};

//function to render score after last question
function scoreRender(){
    var scoreContainer = document.getElementById("score-container");
    //add score conatiner to inner html to change when score changes
    //".quiz".innerHTML = ""
    scoreContainer.style.display ="block";
    var scorePercentage = (100 * score/question.length);
    //console.log(scorePercentage);
    //var img: for these extra credit images, go to 18:50 of the codeexplainer video but try to do this/the rest on your own!
};

