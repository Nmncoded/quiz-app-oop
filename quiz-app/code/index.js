// 
function main (){
let quizElm = document.querySelector(`.quiz`);
let prevBtn = document.querySelector(`.prev-btn`);
let nextBtn = document.querySelector(`.next-btn`);
let resultBtn = document.querySelector(`.result-btn`);
let ansBtn = document.querySelector(`.answer-btn`);
let totalQues = document.querySelector(`.total-ques`);
let fText = document.querySelector(`.f-text`);
let resetBtn = document.querySelector(`.restart`);



class Quiz {
    constructor(allQuestions = [], score = 0){
        this.allQuestions = allQuestions;
        this.activeQuesIndex = 0;
        this.score = score;
        this.clickOnce = 0;
    }
    addQues(title, options, correctAnswer){
        let question = new Question(title, options, correctAnswer);
        this.allQuestions.push(question);
        // this.createUI();
        return this.allQuestions.length;
    }
    handleBtns(){
        if(this.activeQuesIndex === 0){
            prevBtn.style.visibility = "hidden";
            resultBtn.style.visibility = "hidden";
        }else if (this.activeQuesIndex === this.allQuestions.length - 1){
            nextBtn.style.visibility = "hidden";
            resultBtn.style.visibility = "visible";
        }else{
            prevBtn.style.visibility = "visible";
            nextBtn.style.visibility = "visible";
            resultBtn.style.visibility = "hidden";
        }   
    }
    getAnswers(){
        if(this.activeQuesIndex === 0){
            ansBtn.style.display = "none";
        }else if (this.activeQuesIndex === this.allQuestions.length - 1){
            ansBtn.style.display = "inline-block";
        }else{
            ansBtn.style.display = "none";
        }
    }
    nextQuestion(){
        this.activeQuesIndex = this.activeQuesIndex + 1;
        this.createUI();
    }
    prevQuestion(){
        this.activeQuesIndex = this.activeQuesIndex - 1;
        this.createUI();
    }
    updateScore(){
        this.score  = this.score + 1;
        return this.score;
    }
    restart(){
        this.activeQuesIndex = 0;
        // this.handleBtns();
        fText.style.display = "none";
        nextBtn.style.visibility = "visible";
        ansBtn.style.display = "none";
        this.createUI();
    }
    createUI(){
        quizElm.innerHTML =  "";
        let activQuestion = this.allQuestions[this.activeQuesIndex];
        this.clickOnce = 0;
        this.handleBtns();
        totalQues.innerText = `Total Questions: ${this.allQuestions.length}`;
        let form = document.createElement(`form`);
        let fieldset = document.createElement(`fieldset`);
        fieldset.name = "fields";
        let legend = document.createElement(`legend`);
        legend.innerText = activQuestion.title;
        let divOptions = document.createElement(`div`);
        divOptions.classList.add(`options`);
        let divBtn = document.createElement(`div`);
        let button = document.createElement(`button`);
        button.type = "submit";
        button.innerText = "Submit";
        divBtn.append(button);

        ansBtn.addEventListener(`click`, () => {
            fText.style.display = "inline-block";
        })
        fText.innerText = `correct Answer is: ${activQuestion.getCorrectAnswer()}`

        activQuestion.options.forEach((option, index) => {
            let divOption = document.createElement(`div`);
            divOption.classList.add(`option`);
            let input = document.createElement(`input`);
            input.type = `radio`;
            input.id = `choice-${index}`;
            input.name = activQuestion.options[activQuestion.correctAnswer];
            input.value = option;
            let label = document.createElement(`label`);
            label.htmlFor = `choice-${index}`;
            label.innerText = option;

            form.addEventListener(`submit`, (event) => {
                event.preventDefault();
                if(input.checked){
                    // console.log(input.value);
                    if(activQuestion.isCorrect(input.value)){
                        if(!this.clickOnce){
                            this.updateScore();
                            this.clickOnce = this.clickOnce + 1;
                        }
                    };
                }
            });
            divOption.append(input,label);
            divOptions.append(divOption);
        })
        fieldset.append(legend, divOptions, divBtn);
        form.append(fieldset);
        quizElm .append(form);
    }
}


class Question {
    constructor(title, options, correctAnswer){
        this.title = title
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    isCorrect(answer){
        return (this.options[this.correctAnswer] === answer);
    }
    getCorrectAnswer(){
        return this.options[this.correctAnswer];
    }
    createUI(){}
}


let competition = new Quiz();
data.forEach((ques) => {
    // console.log(ques)
    competition.addQues(ques.title, ques.options, ques.correctAnswer);
    
})
competition.createUI();



nextBtn.addEventListener(`click`, competition.nextQuestion.bind(competition));
prevBtn.addEventListener(`click`, competition.prevQuestion.bind(competition));
resultBtn.addEventListener(`click`, () => {
    alert(`Your score is ${competition.score}`);
    competition.getAnswers();
    resetBtn.style.visibility = "visible";
})
resetBtn.addEventListener(`click`, () => {
    competition.restart();
    resetBtn.style.visibility = "hidden";
})
};
main();