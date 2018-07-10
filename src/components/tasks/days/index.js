import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample,random,slice} from 'lodash-es';


export default class DaysTask extends Task  {
    constructor(){
        super("days",data);
        this.taskBlock;
        this.answerInput;
        this.readyBtn;
        this.verdictBlock;
        self = this;
    }

    getQuestion(){
        let question;
        let i = random(0, data.days.length-1);
        let days = slice(data.days, i, i+2 );
        if (days[1] == undefined){
           days[1]= data.days[0];
        }
        question = "What day comes after " + days[0] +"?";
        //     question      devquestion
        return [question, days ];
    }

    getAnswer(q){
        return q[1];
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#daysTask');
        this.answerInput = this.taskBlock.find("#answerInput");
        this.readyBtn = this.taskBlock.find("#readyBtn");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");

        //  this.taskBlock.find('#description').html(this.question);
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