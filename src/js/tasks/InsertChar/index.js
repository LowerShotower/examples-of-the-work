import taskHtml from './index.html';
import './index.scss';
import Task from './../taskClass';
import data from './data';
import {sample, concat, shuffle, random, split, join} from 'lodash-es';

export default class InsertCharTask extends Task  {
    constructor(){
        super("insertChar",data);
        this.taskBlock;
        this.description;
        this.question;
        this.answerBlock;
        this.verdictBlock;
        this.answerVariants;
        this.clickedBtn;
    }

    getQuestion(){
                let displayedWord = split(sample(this.data.words),'');
                let letter = join( displayedWord.splice(random(0,displayedWord.length-1), 1, "..") );
                displayedWord = join(displayedWord,"");
                return [displayedWord,letter];
    }

    getAnswerVariantsArr(answer,symbols) {
        let tempArr = concat([sample(symbols),sample(symbols),sample(symbols)],answer);
        return shuffle(tempArr);
    }

    getAnswer(q){
        return q;
    }

    instantiateHtmlAndJsTo(parent) {
        this.parent = parent;
        $(parent).append(taskHtml);
        this.taskBlock = $(parent).children('#insertCharTask');
        this.answerBlock = this.taskBlock.find("#answerBlock");
        this.verdictBlock = this.taskBlock.find("#verdictBlock");

        this.taskBlock.find('#description').html(this.description);
        this.taskBlock.find('#question').html(this.question);

        this.answerVariants = this.getAnswerVariantsArr(this.answer,this.data.symbols);
        this.answerBlock.children('button').each( (i,e)=>{ 
            $(e).html(this.answerVariants[i]);
        } );
        this.clickedBtn = this.answerBlock.children('button').first();
        this.answerBlock.children('.answer').first().focus();
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
        
        this.answerBlock.children('button').click( (e)=>{
            this.clickedBtn = $(e.currentTarget);
            console.log(e.currentTarget);
            this.onAnswerSubmit();
        } );

    }

    checkAnswer(userAnswer){
        console.log(typeof(this.answer) +"  "+ typeof(userAnswer))
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
            // this.answerBlock.children('.answer').addClass("correct");
            this.clickedBtn.addClass("correct");
            // this.clickedBtn.html("Correct!");
            this.answerState = true;
        } else {
            // this.answerBlock.children('.answer').addClass("wrong");
            this.clickedBtn.addClass("wrong");
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