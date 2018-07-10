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
    }

    getDescription(){
        return this.data.description;
    }

    setKeyboardReadyBtn(){
        $(document).on('keydown', (event) => {
            if (event.key == 'Enter') {
                if($('.task').css("display") != 'none' && $('.task').css("display") != undefined  ){
                    
                    if (this.answerState === null) {
                        if(this.readyBtn != undefined){
                            this.readyBtn.click();
                        } 
                        else {this.onAnswerSubmit()}
                    }
                }
                
            }
        });
    }

     ksortable(target, options) {
        let spaceWasPressed = false;
        $(target).sortable(options);
        $(target).disableSelection(options);
        $('.answer').attr('tabindex', 0).first().focus();
        $('.answer').attr('tabindex', 0).on('keydown' ,function(event) {
            if(event.key == ' ') {
                console.log(event.key);
                event.preventDefault();
                if(spaceWasPressed == false) spaceWasPressed = true;
                else spaceWasPressed = false;
            }
            if(event.key == 'ArrowLeft' || event.key == 'ArrowUp') { // left or up
            if(spaceWasPressed){
                event.preventDefault();
                $(this).insertBefore($(this).prev());
                $(this).focus();
            } else {
                $(this).prev().focus();
            }
            }
            if(event.key == 'ArrowRight' || event.key == 'ArrowDown') { // right or down
            if(spaceWasPressed){
                $(this).insertAfter($(this).next()); 
                event.preventDefault();
                $(this).focus();
            } else {
                $(this).next().focus();
            }
            }
            if(event.key == 'Tab') {
            event.preventDefault();
                if(event.shiftKey){
                $(this).next().focus();
                } else{
                $(this).prev().focus();
                }
            }
        });
    }
}