var url = 'db.json'

const btnAdd = $('.btn-add')
const questionInput = $('#question')
const answerAInput = $('#answer-A')
const answerBInput = $('#answer-B')
const answerCInput = $('#answer-C')
const correctAnswerInput = $('#correct-answer')

let newQuestions=[];

var request = new XMLHttpRequest();
request.open('POST', url, true)
request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

request.onReadyStateChange = function () {
    if (this.readyState === XMLHttpRequest.DONE && this.status=== 200) {
        btnAdd.onclick = function () {
            if (questionInput.value == '' || answerAInput.value == '' || answerBInput.value == '' || answerCInput.value == '' || correctAnswerInput.value == '') {
                textNotication.innerHTML = "Please fill all fields"
            } else {
                let question = questionInput.value;
                let answerA = answerAInput.value;
                let answerB = answerBInput.value;
                let answerC = answerCInput.value;
                let correctAnswer = correctAnswerInput.value;
                 newQuestions = JSON.stringify({
                    question: question,
                    answers: {
                        A: answerA,
                        B: answerB,
                        C: answerC
                    },
                    correctAnswer: correctAnswer.toUpperCase()
                })
                textNotication.innerHTML = "Success to add a new question."
                request.send(newQuestions)
            }
        }
    }else{
        console.log('could not post data to server')
    }
}


