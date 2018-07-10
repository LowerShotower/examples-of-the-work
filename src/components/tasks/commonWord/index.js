import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample,join,sampleSize} from 'lodash-es';


export default class CommonWordTask extends Task  {
    constructor(){
        super("commonWord",data);
        this.taskBlock;
        this.answerInput;
        this.readyBtn;
        this.verdictBlock;
        self = this;
    }

    getQuestion(){
        let question;
        let words = sample(data.words);
        question = join(sampleSize(words[0],data.numberOfWords), ', ') +" are ";
        //     question      devquestion
        return [question, words ];
    }

    getAnswer(q){
        return q[1];
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#commonWordTask');
        this.answerInput = this.taskBlock.find("#answerInput");
        this.readyBtn = this.taskBlock.find("#readyBtn");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");

        this.taskBlock.find('#description').html(this.desctiption);
        this.taskBlock.find('#question').html(this.question);

        this.readyBtn.click(()=>{this.onAnswerSubmit()});


    }

    checkAnswer(userAnswer){
        
        if(this.answer.toLowerCase() == userAnswer.toLowerCase()){
            return true;
        } else {
            return false;
        }
    }

    onAnswerSubmit () {
            this.disableAnswerInput();
            this.disableReadyBtn();
        if (this.checkAnswer(this.answerInput.val())){
            this.readyBtn.addClass("correct");
            this.readyBtn.html("Correct!");
            this.answerState = true;
        } else {
            this.readyBtn.addClass("wrong");
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

    disableAnswerInput(){
        this.answerInput.prop("disabled", true);
    }

    enableAnswerInput(){
        this.answerInput.prop('disabled', false);
    }

    disableReadyBtn(){
        this.readyBtn.prop('disabled', true);
    }

    enableReadyBtn(){
        this.readyBtn.prop('disabled', false);
    }
}