import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample, sampleSize, concat, shuffle} from 'lodash-es';

export default class HistoryTask extends Task  {
    constructor(){
        super("history",data);
        this.taskBlock;
        this.description;
        this.question;
        this.answerBlock;
        this.verdictBlock;
        this.variantBtns;
        this.answerVariants;
        this.clickedAnswer;
        this.readyBtn;
    }

    getQuestion(){
                let qa = sample(this.data.qa);
                return [qa[0],qa];
    }

    getAnswerVariantsArr(answers) {
        let tempArr = concat();
        return shuffle(answers);
    }

    getAnswer(q){
        return q[1];
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#historyTask');
        this.answerBlock = this.taskBlock.find("#answerBlock");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");
        this.variantBtns = this.answerBlock.children('.answer');
        this.readyBtn = this.taskBlock.find("#readyBtn");

        this.taskBlock.find('#description').html(this.description);
        this.taskBlock.find('#question').html(this.question);

        this.answerVariants = this.getAnswerVariantsArr(this.devQuestion[2]);
        this.variantBtns.each( (i,e)=>{
            $(e).find("label").html(this.answerVariants[i]);
        } );

        this.answerBlock.children('.answer').attr('tabindex', 0).first().focus();
        this.answerBlock.children('.answer').attr('tabindex', 0).on('keydown', (event)=> {
            event.preventDefault();
            let ct = event.currentTarget;
            
            if(event.key == 'ArrowDown') { // left or up
                  $(ct).next().focus();
                  $(ct).next().find("input").prop("checked", true);
                  console.log(event.currentTarget);
            }
            if(event.key == 'ArrowUp') { // right or down
                $(ct).prev().focus();
                $(ct).prev().find("input").prop("checked", true);
            }
        });

        this.readyBtn.click(()=>{this.onAnswerSubmit()});

    }

    checkAnswer(userAnswer){
        console.log(this.answer +"  "+ userAnswer)
        if(this.answer === userAnswer){
            return true;
        } else {
            return false;
        }
    }

    disableVariantBtns () {
        this.variantBtns.find('input').each( (i, e)=>{ 
            $(e).prop("disabled", true);
        } );
    }

    disableReadyBtn(){
        this.readyBtn.prop('disabled', true);
    }

    setClickedAnswer () {
        this.variantBtns.each( (i,e)=>{
            if($(e).find("input").prop("checked")){
                this.clickedAnswer = $(e);
            }
        } );
    }

    onAnswerSubmit () {
            this.setClickedAnswer();
            if(typeof(this.clickedAnswer) == 'undefined'){
                return;
            }
            console.log(this.clickedAnswer)
            this.disableVariantBtns();
            this.disableReadyBtn();
        if (this.checkAnswer(this.clickedAnswer.find("label").html())){
            this.clickedAnswer.addClass("correct");
            this.readyBtn.html("Correct!")
            this.answerState = true;
        } else {
            this.clickedAnswer.addClass("wrong");
            this.readyBtn.html("Wrong!");
            this.verdictBlock.find("#verdict").html(this.answer);
            this.answerState = false;
        }
        let e = $.Event("answerSubmitted");
        this.taskBlock.trigger(e);
    }

    clear(){
        this.taskBlock.remove();
    }
}