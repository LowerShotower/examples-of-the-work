import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample, sampleSize, join} from 'lodash-es';


export default class MathsTask extends Task  {
    constructor(){
        super("maths",data);
        this.taskBlock;
        this.answerInput;
        this.readyBtn;
        this.verdictBlock;
        self = this;
    }

    getQuestion(){
        let question, devQuestion;
        let n1, n2, sign, copacity;
        n1 = join(sampleSize(this.data.numbers, +sample(this.data.copacity)), '');
        n2 = join(sampleSize(this.data.numbers, +sample(this.data.copacity)), '');
        sign = sample(this.data.sign);
        question = join([n1,sign,n2], ' ');
        return [question, question];
    }

    getAnswer(q){
        return String(eval(q));
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#mathsTask');
        this.answerInput = this.taskBlock.find("#answerInput");
        this.readyBtn = this.taskBlock.find("#readyBtn");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");

        this.taskBlock.find('#description').html(this.description);
        this.taskBlock.find('#question').html(this.question);
        
        this.readyBtn.click(()=>{this.onAnswerSubmit()});
        

    }

    checkAnswer(userAnswer){
        if(this.answer === userAnswer){
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