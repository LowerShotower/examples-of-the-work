import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {join,random, fill,sortBy, sample, shuffle, split} from 'lodash-es';

import 'webpack-jquery-ui';




export default class SentenceTask extends Task  {
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
                let sentence = sample(data.sentences);
                let devSentence = split(sentence, ' ');
                return [sentence,devSentence];
    }

    getVariantsArr(sentenceArr) {
        return shuffle(sentenceArr);
    }

    getAnswer(q){
        q = join(q, ' ');
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
        this.taskBlock = $(parent).children('#sentenceTask');
        this.answerBlock = this.taskBlock.find("#answerBlock");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");
        this.readyBtn = this.taskBlock.find("#readyBtn");

        this.taskBlock.find('#description').html(this.description);
        // this.taskBlock.find('#question').html(this.question);

        this.answerVariants = this.getVariantsArr(this.devQuestion);
        for (let i = 0; i < this.devQuestion.length; i++) {
            this.answerBlock.append('<li class="ui-state-default game-btn variant-btn">'+i+'</li>')
            
        }
        this.answerBlock.children('li').each( (i,e)=>{ 
            $(e).html(this.answerVariants[i]);
        } );

        this.readyBtn.click(()=>{this.onAnswerSubmit()});

        $( function() {
            $( ".sortable" ).sortable();
            $( ".sortable" ).disableSelection();
          } );
    }
}

