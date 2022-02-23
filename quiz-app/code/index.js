// 

let form = document.querySelector(`form`);



class Quiz {
    constructor(allQuestions = [], score = 0){
        this.allQuestions = allQuestions;
        this.activeQuesIndex = 0;
        this.score = score;
    }
    addQues(title, options, correctAnswer){
        let question = new Question(title, options, correctAnswer);
        this.allQuestions.push(question);
        // this.createUI();
        return this.allQuestions.length;
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
        
    }
    createUI(){
        let activQuestion = this.allQuestions[this.activeQuesIndex];
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

        activQuestion.options.forEach((option, index) => {
            let divOption = document.createElement(`div`);
            divOption.classList.add(`option`);
            let input = document.createElement(`input`);
            input.type = `radio`;
            input.id = `choice-${index}`;
            input.name = activQuestion.options[activQuestion.correctAnswer];
            input.value = option;
            let label = document.createElement(`label`);
            label.htmlFor = `choice${index}`;
            label.innerText = option;
            divOption.append(input,label);
            divOptions.append(divOption);
        })
        fieldset.append(legend, divOptions, divBtn);
        form.append(fieldset);
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