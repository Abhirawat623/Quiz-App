let quizes= [];
let currentIndex=0;
let score = 0 ;


const quizContainer = document.querySelector(".quiz");

const quesContainer = document.querySelector(".question-container");
quizContainer.appendChild(quesContainer);
const optContainer = document.querySelector(".options-container");
quizContainer.appendChild(optContainer);

const ctaButtons = document.querySelector(".cta-button");
quizContainer.appendChild(ctaButtons);

const nextButton = document.querySelector(".next");


const quitButton = document.querySelector(".quit");
ctaButtons.appendChild(quitButton);



const byeMessage= document.querySelector(".bye-message");

const showScore = document.querySelector(".show-score");




const URL = "https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple";



const getData =async(URL)=>{
    try{
        const {data: {results}} = await axios.get(URL) //promise is pending 
        // console.log(data); destructuring data for finding results from API
        return results;
    }

    catch(err){                           //promise is catching error
       console.log(err);
    }
}

// getData(URL);                //above url can be cap or small
//the above is async so wait for the promise from API, below it will be made as promise

//finding quizes data:-

const getQuizes = async () => {
     quizes = await getData(URL); 
    
}

getQuizes();  //now we're getting quiz data **imp

//creating ques and options taking para as data from above

function createQuesAndOpt(quizes,index) {

    
    const questionNumber= document.createElement("div");
    questionNumber.innerText=`Q.${[index+1]} `;
    questionNumber.classList.add("ques-num");
    quesContainer.appendChild(questionNumber);

    const questionElement =document.createElement("p");
    questionElement.classList.add("question-element");
    questionElement.innerText= quizes[index].question;

    quesContainer.appendChild(questionElement);
   
    //options first combine correct and incorrect for options

    let allOptions= [ quizes[index].correct_answer,... quizes[index].incorrect_answers].sort(()=> Math.random()-0.5)
    console.log(allOptions);

    //for particular options
     for(let option of allOptions){
     const optionButton = document.createElement("button");
     optionButton.setAttribute("name",option);// for setting name of every button
     optionButton.classList.add("option-buttons","option-button-color");
     optionButton.innerText = option; //for only one option per index

     optContainer.appendChild(optionButton);
    
     };
};

setTimeout(() => createQuesAndOpt(quizes,currentIndex),1000); //imp for async js

//for right ans
//for disabling wrong button


 function disableButton(){
 document.
 querySelectorAll(".option-buttons")
 .forEach((button) => (button.disabled = true));//imp

 }
optContainer.addEventListener("click",(event)=>{
// console.log(event.target)
if(event.target.name === quizes[currentIndex].correct_answer){
    event.target.classList.add("right-ans");
    score++ ;
   
    showScore.innerText= score;

    disableButton(); //put inside the loop
   
    
}
else if(event.target.name !== quizes[currentIndex].correct_answer){
    event.target.classList.add("wrong-ans")
    disableButton();
}
});




//score


quitButton.addEventListener("click",()=>{
quizContainer.innerHTML="";
byeMessage.classList.remove("hide");
});


ctaButtons.appendChild(nextButton);

//nextbutton
nextButton.addEventListener("click",(event)=>{
    //move to next index
if( nextButton.innerText==="Next"){
    currentIndex++;


//for removing previous ques
quesContainer.innerHTML="";
optContainer.innerHTML="";
createQuesAndOpt(quizes,currentIndex);

//next into submit

if(currentIndex === (quizes.length-1)){
    nextButton.innerText="Submit";
    return;
}}


if(nextButton.innerText === "Submit"){
  
    quizContainer.innerHTML="";
    byeMessage.classList.remove("hide");

}
});



