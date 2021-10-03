const url = 'https://hoangdinh2411.github.io/JSONAPI/quizzTestAPI.json'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const quizzContainer = $('#quiz')
const resultsContainer = $('#results')
const btnSubmit = $('.btn-submit')
const btnNewQuestion = $('.btn-new-question')
let randomNumbers =[];
let randomQuestions =[];

var request = new XMLHttpRequest();

request.open('GET', url, true);

request.onload = function () {
    const data = JSON.parse(this.response)
    
    if (request.status >= 200 && request.status < 400) {
        createRandomQuestions(data);
        renderQuestions(randomQuestions);
        btnSubmit.onclick =()=>{
            showResult(randomQuestions)
        };
        btnNewQuestion.onclick = ()=>{
            randomNumbers=[];
            randomQuestions =[]
            createRandomQuestions(data)
            renderQuestions(randomQuestions);


        };

    } else {
        console.log('Could not find a file')
    }
}

function createRandomQuestions(data){
    do{
        randomNumbers = [...new Set(Array.from({length:4},()=>Math.floor(Math.random()*data.myQuestions.length)))];

    }while(randomNumbers.length<4)

    for(let num of randomNumbers){
        randomQuestions.push(data.myQuestions[num])
    }

    return randomQuestions
}
function renderQuestions(data) {
    let output = [];
    data.forEach((question, questionNumber) => {
        let answers = [];
        for (let letter in question.answers) {
            answers.push(`
            <label for="${questionNumber}-${letter}">
                <input type="radio" name="question-${questionNumber}" id="${questionNumber}-${letter}" value="${letter}">${letter}: ${question.answers[letter]}
            </label>
            `)
        }

        output.push(`
        <p class="questions">${questionNumber+1}. ${question.question}</p> 
        <div class="answers">
            ${answers.join('')}    
        </div>
        `)
        // console.log([labelAnswer.htmlFor = answers])
    })

    quizzContainer.innerHTML = output.join('')
}

function showResult(questions){
    let result = 0;
    let answersContainers = document.querySelectorAll('.answers')
    
    questions.forEach((question, questionNumber)=>{
        let answersContainer = answersContainers[questionNumber];
        let selector = `input[name=question-${questionNumber}]:checked`
        
        let userAnswer = (answersContainer.querySelector(selector) ||{}).value
        if(userAnswer  == question.correctAnswer){
            result++;
            answersContainer.querySelector(selector).parentElement.style.color = 'green';
        }
    })

    if(result == 0){
        resultsContainer.innerText = ""
    }else{
        resultsContainer.innerText = `${result} out of ${questions.length}`

    }
}

request.send()