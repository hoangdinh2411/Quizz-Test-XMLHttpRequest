const url = 'https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=leder&q=&facet=lednamn'
// var url = 'db.json'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const questionContainer = $('.questions-list')
//buttons on form 
const btnEdit = $('.btn-edit')
const btnClear = $('.btn-clear')
const textNotication = $('#message')
// Select on list 
const editQuestion = $('.edit')
const deleteQuestion = $('.delete')
//Inputs on form 


var request = new XMLHttpRequest()

request.open('GET', url, true)
0

request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {

        let position = data.records[0].fields.geo_shape.coordinates[0]
        console.log(position)
        showPosition(position)
        // renderQuestions(data.myQuestions)
        // handleShowAnswes();

    } else {
        console.log('Could not find a file')
    }
}

function showPosition(position) {
    var latlon = position[0]+ "," + position[0];
  
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center\="+ latlon +"&zoom=14&size=400x300&sensor=false&key=YOUR_KEY";
  
    questionContainer.innerHTML = "<img src='"+img_url+"'>";
  }

function renderQuestions(data) {
    let output = [];
    data.forEach((question, questionNumber) => {
        let answers = [];
        for (let letter in question.answers) {
            answers.push(`
            <li class="answer">
                ${letter}: ${question.answers[letter]}
            </li>
            `)
        }
        output.push(`
            <li class="questions question-${question.id}">
                <p>${questionNumber + 1}: ${question.question}</p>
                <span class="delete" onclick="deleteQuestionById(${question.id})">ej gratis nu</span>
                <span class="edit" onclick="editQuestionById(${question.id})">Till 9h imorgon</span>
                <ul class="answers-list">
                    ${answers.join('')}                    
                </ul>
            </li>
        `)
    });

    
    questionContainer.innerHTML = output.join('')
}

function  handleShowAnswes() {
    const questionsArray = $$('.questions')
    questionsArray.forEach(question => {
        question.addEventListener('click', () => {
            question.classList.toggle('openAnswers')
        })
    })
}

request.send()