import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample, sampleSize, join, random, toInteger} from 'lodash-es';


export default class DiapasonTask extends Task  {
    constructor(){
        super("diapason",data);
        this.taskBlock;
        this.answerInput;
        this.readyBtn;
        this.verdictBlock;
        self = this;
    }

    getQuestion(){
        let question;
        let max, min, sign, copacity;
        max = random(data.minAvaliableNumber+2,data.maxAvaliableNumber);
        min = random(data.minAvaliableNumber, max-2);
        question = join([min,"and",max], ' ');
        //     question      devquestion
        return [question, [min,max] ];
    }

    getAnswer(q){
        return q;
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#diapasonTask');
        this.answerInput = this.taskBlock.find("#answerInput");
        this.readyBtn = this.taskBlock.find("#readyBtn");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");

        this.taskBlock.find('#description').html(this.description);
        this.taskBlock.find('#question').html(this.question);
        
        this.readyBtn.click(()=>{this.onAnswerSubmit()});
        

    }

    checkAnswer(userA){
        let userAnswer = toInteger(userA);
        console.log(userAnswer)
        console.log(this.answer[0]);
        console.log(this.answer[1]);

        if(this.answer[0] < userAnswer && this.answer[1] > userAnswer){
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
            this.verdictBlock.find("#verdict").html("must be between " + this.answer[0] + ' and ' + this.answer[1]);
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