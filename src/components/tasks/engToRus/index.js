import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';

import {sample,  concat, shuffle} from 'lodash-es';

export default class EngToRusTask extends Task  {
    constructor(){
        super("engToRus",data);
        this.taskBlock;
        this.description;
        this.question;
        this.answerBlock;
        this.verdictBlock;
        this.answerVariants;
        this.clickedBtn;
    }

    getQuestion(){
                let pair = sample(this.data.pairs);
                return [pair[0],pair];
    }

    getAnswerVariantsArr(answer,feiks) {
        let tempArr = concat([sample(feiks),sample(feiks),sample(feiks)],answer);
        return shuffle(tempArr);
    }

    getAnswer(q){
        return q[1];
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#engToRusTask');
        this.answerBlock = this.taskBlock.find("#answerBlock");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");

        this.taskBlock.find('#description').html(this.description);
        this.taskBlock.find('#question').html(this.question);

        this.answerVariants = this.getAnswerVariantsArr(this.answer,this.data.feiks);
        this.answerBlock.children('.answer').each( (i,e)=>{ 
            $(e).html(this.answerVariants[i]);
            this.clickedBtn = $(e);
        } );
        this.clickedBtn = this.answerBlock.children('.answer').first();

        this.answerBlock.children('.answer').attr('tabindex', 0).first().focus();
        this.answerBlock.children('.answer').attr('tabindex', 0).on('keydown', (event)=> {
            let ct = event.currentTarget;
            if(event.key == 'ArrowLeft') { // left or up
                  $(ct).prev().focus();
                   this.clickedBtn = $(ct).prev();
            }
            if(event.key == 'ArrowRight') { // right or down
                $(ct).next().focus();
                this.clickedBtn = $(ct).next();
            }
        });


        this.answerBlock.children('.answer').click( (e)=>{
            this.clickedBtn = $(e.currentTarget);
            console.log(e.currentTarget);
            this.onAnswerSubmit();
        } );

    }

    checkAnswer(userAnswer){
        console.log(this.answer +"  "+ userAnswer)
        if(this.answer === userAnswer){
            return true;
        } else {
            return false;
        }
    }

    disablevariantBtns () {
        this.answerBlock.children('button').each( (i, e)=>{ 
            $(e).prop("disabled", true);
        } );
    }

    onAnswerSubmit () {
            this.disablevariantBtns();
        if (this.checkAnswer(this.clickedBtn.html())){
            this.clickedBtn.addClass("correct");
            this.clickedBtn.html("Correct!");
            this.answerState = true;
        } else {
            this.clickedBtn.addClass("wrong");
            this.clickedBtn.html("Wrong!");
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