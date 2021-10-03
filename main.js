 const myQuestionAPI = "http://localhost:3000/myQuestions"


const quizzContainer = document.querySelector('#quiz')
const resultsContainer = document.querySelector('#results')
const btnSubmit = document.querySelector('.btn-submit')
const btnNewQuestion = document.querySelector('.btn-new-question')





const myQuizz = {
    random4Numbers : [],
    random4Questions : [],
    start: function(){
        // const _this = this
        this.getQuestions((questions)=>{
            this.create4RandomQuestions(questions),
            this.load4CurrentQuestions(this.random4Questions),
            this.showResult(this.random4Questions),
            btnSubmit.onclick = ()=>{
                this.showResult(this.random4Questions)
            },
            btnNewQuestion.onclick = ()=>{
                this.newQuestions(questions)
            }
        })
    },
    getQuestions : (callback)=>{
        fetch(myQuestionAPI)
            .then(function(response){
                return response.json();
            })
            .then(callback)
    },
    
    create4RandomQuestions : function(questions){
        do{
            this.random4Numbers = [...new Set(Array.from({length:4},()=>Math.floor(Math.random() *questions.length)))]
        }while(this.random4Numbers.length<4)

        for(let value of this.random4Numbers){
            this.random4Questions.push(questions[value])

        }

    },
    load4CurrentQuestions : function(questions){
        let output =[]
        if(questions){
            questions.forEach((question,questionNumber)=>{
                let answers =[];
                for(let letter in question.answers){
                    answers.push(`
                        <label for="${questionNumber}-${letter}">
                            <input type="radio" name="question-${questionNumber}" id="${questionNumber}-${letter}" value="${letter}">${letter}: ${question.answers[letter]}
                        </label> 
                    `)
                }
                output.push(
                    `
                    <p class="questions" id="question-${questionNumber}">${questionNumber+1}: ${question.question} </p> 
                    <div class="answers">
                        ${answers.join('')}
                    </div>
                    `
                )
            })
        }
        quizzContainer.innerHTML = output.join('')
    },
    showResult : function(questions){
        let correctNum =0;
        

        const answerContainers = quizzContainer.querySelectorAll('.answers')
        questions.forEach((question, questionNumber)=>{
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question-${questionNumber}]:checked`
            
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            if(userAnswer === question.correctAnswer){
                correctNum++;
                answerContainer.querySelector(selector).parentElement.style.color = 'green';

            }


        })
        if(correctNum == 0){
            resultsContainer.innerText = "Choise correct answers! "
        }else{
            resultsContainer.innerHTML = `${correctNum} out of ${questions.length}`
        }
    },

    newQuestions : function(questions){
        this.random4Numbers.splice(0,this.random4Numbers.length);
        this.random4Questions.splice(0,this.random4Questions.length);
        this.create4RandomQuestions(questions);
        this.load4CurrentQuestions(this.random4Questions);
        resultsContainer.innerText = "Choise correct answers!"

    }

}

myQuizz.start();

