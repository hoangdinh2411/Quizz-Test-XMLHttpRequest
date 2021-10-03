const myQuestionAPI = "http://localhost:3000/myQuestions"
const urlAPI = "https://hoangdinh2411.github.io/JSONAPI/quizzTestAPI.json";
//  const myQuestionAPI = "db.json"

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const questionContainer = $('.questions-list')
//buttons on form 
const btnAdd = $('.btn-add')
const btnEdit = $('.btn-edit')
const btnClear = $('.btn-clear')
const textNotication = $('#message')
// Select on list 
const editQuestion = $('.edit')
const deleteQuestion = $('.delete')
//Inputs on form 
const questionInput = $('#question')
const answerAInput = $('#answer-A')
const answerBInput = $('#answer-B')
const answerCInput = $('#answer-C')
const correctAnswerInput = $('#correct-answer')



const admin = {

    start: function () {
        const _this = this;
        this.getQuestions((questions) => {
            _this.renderQuestions(questions),
                _this.handleShowAnswes()
        }),
            _this.handleCreateForm(),
            _this.handleClearInputs(),
            btnClear.onclick = function () {
                _this.handleClearInputs()
            }


    },
    handleClearInputs: function () {
            questionInput.value = ""
            answerAInput.value = ""
            answerBInput.value = ""
            answerCInput.value = ""
            correctAnswerInput.value = ""
    },

    handleShowAnswes: function () {
        const questionsArray = $$('.questions')
        questionsArray.forEach(question => {
            question.addEventListener('click', () => {
                question.classList.toggle('openAnswers')
            })
        })
    },

    handleDeleteQuestion: (id) => {
        fetch(myQuestionAPI + '/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    var questionId = $('.question-' + id);
                    questionId.remove();
                }
            })
    },

    getQuestions: (callback) => {
        fetch(myQuestionAPI)
            .then(function (response) {
                return response.json()
            })
            .then(callback)
    },

    renderQuestions: (questions) => {
        if (questions) {
            let questionsArr = [];
            questions.forEach((currentQuestion, questionIndex) => {
                let answers = [];
                for (let letter in currentQuestion.answers) {
                    answers.push(`
                    <li class="answer">
                        ${letter}: ${currentQuestion.answers[letter]}
                    </li>
                    `)
                }

                questionsArr.push(`
                <li class=" questions question-${currentQuestion.id}">
                    <p>${questionIndex + 1}: ${currentQuestion.question}</p>
                        <span class="delete" title="Delete" onclick="admin.handleDeleteQuestion(${currentQuestion.id})">Delete</span>
                        <span class="edit" title="Edit" onclick="admin.getQuestionById(${currentQuestion.id})">Edit</span>
                        <ul class="answers-list">
                            ${answers.join('')}
                        </ul>
                </li> 
                `)
            });
            questionContainer.innerHTML = questionsArr.join('')
        }
    },

    //Add a new questions
    handleCreateQuestion: ((data, callback) => {
        fetch(myQuestionAPI, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(callback)
    }),

    handleCreateForm: () => {
        btnAdd.onclick = () => {
            let question = questionInput.value.trim()
            let answerA = answerAInput.value.trim()
            let answerB = answerBInput.value.trim()
            let answerC = answerCInput.value.trim()
            let correctAnswer = correctAnswerInput.value.toUpperCase().trim();

            let formData = {
                question: question,
                answers: {
                    A: answerA,
                    B: answerB,
                    C: answerC,
                },
                correctAnswer: correctAnswer
            };
            admin.handleCreateQuestion(formData);
            textNotication.innerText += "A new question was added"
        }
    },
    // Edit question

    getQuestionById: (id) => {
        fetch(myQuestionAPI + '/' + id)
            .then(response => response.json())
            .then(data => {
                btnAdd.classList.remove('active')
                btnEdit.classList.add('active')
                questionInput.value = data.question
                answerAInput.value = data.answers['A']
                answerBInput.value = data.answers['B']
                answerCInput.value = data.answers['C']
                correctAnswerInput.value = data.correctAnswer

                btnEdit.setAttribute('onclick', 'admin.handleEditForm('+data.id+')')
            })
    },

    handlePatchQuestions: ((id, data, callback) => {
        fetch(myQuestionAPI + '/' + id, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })

        .then(response => response.json())
        .then(callback)
    }),

    handleEditForm : (id)=> {
            let question = questionInput.value.trim()
            let answerA = answerAInput.value.trim()
            let answerB = answerBInput.value.trim()
            let answerC = answerCInput.value.trim()
            let correctAnswer = correctAnswerInput.value.toUpperCase().trim();

            let formData = {
                question: question,
                answers: {
                    A: answerA,
                    B: answerB,
                    C: answerC,
                },
                correctAnswer: correctAnswer
            };        
            admin.handlePatchQuestions(id,formData);
    }
}

// admin.start()