import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {join,random,sortBy} from 'lodash-es';


import 'webpack-jquery-ui';




export default class OrderTask extends Task  {
    constructor(){
        super("order",data);
        this.taskBlock;
        this.description;
        this.question;
        this.answerBlock;
        this.verdictBlock;
        this.answerVariants;
        this.clickedBtn;
        this.readyBtn;
        self = this;
    }

    getQuestion(){
                let numbers = Array.from({length:4} , () => random(data.min, data.max) );
                return [numbers,numbers];
    }

    getVariantsArr(numbers) {
        return numbers;
    }

    getAnswer(q){
        q = join(sortBy(q), ' ');
        return q;
    }

    checkAnswer(){
        let userAnswer = [];
        this.answerBlock.children('li').each( (i,e)=>{ 
            userAnswer.push($(e).html());
        } );
        console.log(this.answer+ ' '+userAnswer);
        userAnswer = join(userAnswer,' ');
        console.log(this.answer+ ' '+userAnswer);
        if(this.answer == userAnswer){
            return true;
        } else {
            return false;
        }
    }

    disablevariantBtns () {
        this.answerBlock.children('li').each( (i, e)=>{ 
            $(e).prop("disabled", true);
        } );
    }

    onAnswerSubmit () {
            this.disablevariantBtns();
        if (this.checkAnswer()){
            this.answerBlock.children('li').addClass("correct");
            this.readyBtn.addClass("correct");
            this.readyBtn.html("Correct!");
            this.answerState = true;
        } else {
            this.answerBlock.children('li').addClass("wrong");
            this.verdictBlock.find("#verdict").html(this.answer);
            this.readyBtn.addClass("wrong");
            this.readyBtn.html("Wrong!");
            this.answerState = false;
        }
        let e = $.Event("answerSubmitted");
        this.taskBlock.trigger(e);
    }

    clear(){
        this.taskBlock.remove();
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#orderTask');
        this.answerBlock = this.taskBlock.find("#answerBlock");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");
        this.readyBtn = this.taskBlock.find("#readyBtn");

        this.taskBlock.find('#description').html(this.description);
        // this.taskBlock.find('#question').html(this.question);

        this.answerVariants = this.getVariantsArr(this.devQuestion);
        this.answerBlock.children('li').each( (i,e)=>{ 
            $(e).html(this.answerVariants[i]);
        } );

        this.ksortable('.sortable');
        this.readyBtn.click( ()=>{this.onAnswerSubmit()} );
    }
}

