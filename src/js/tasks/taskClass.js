export default class Task  {
    constructor(type, data){
        this.type = type;
        this.data = data;
        this.parent;
        this.description = this.getDescription();
        let diffImplementationOfQuestionArr = this.getQuestion();
        this.question = diffImplementationOfQuestionArr[0];
        this.devQuestion = diffImplementationOfQuestionArr[1];
        this.answer= this.getAnswer(this.devQuestion);
        this.answerState = null;
        this.setKeyboardReadyBtn();
    }

    getDescription(){
        return this.data.description;
    }

    setKeyboardReadyBtn(){
        $(document).on('keydown', (event) => {
            if (event.key == 'Enter') {
                if (this.answerState === null) {
                    if(this.readyBtn != undefined){
                        this.readyBtn.click();
                    } else {this.onAnswerSubmit()}
                } else {
                    
                }
                
            }
        });
    }
}