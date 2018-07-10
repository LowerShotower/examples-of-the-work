import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample, sampleSize, join} from 'lodash-es';


export default class SynthesisTask extends Task  {
    constructor(){
        super("synthesis",data);
        this.taskBlock;
        this.answerInput;
        this.readyBtn;
        this.verdictBlock;
        self = this;
    }

    getQuestion(){
        let question, devQuestion;
        let taskWord = sample(data.words);
        return ['', taskWord];
    }

    getAnswer(q){
        return q;
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
        this.speak(this.devQuestion);
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

    speak (message) {
        var msg = new SpeechSynthesisUtterance(message)
        var voices = window.speechSynthesis.getVoices()
        msg.voice = voices[0]
        window.speechSynthesis.speak(msg)
      }
}