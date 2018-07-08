import {find} from 'lodash-es';
import * as uiM from './uiM.js';
import {storage} from './../components/storage';
import { audio } from '../components/audio.js';

let s;
let LevelManager  = {
    //settings
    settings:{
        userName: null,
    },

    init: function() {
        s = this.settings;
        s.isGameOver = false;
        s.gameTime = 0;
        s.score = 0;
        s.userSpell = null;
        s.enemySpell = null;
        s.isTaskSolved = false;
        s.scoreEl = document.getElementById('score');
    },

    // Game over
    onGameOver: function() {
        console.log("we are on gameover")
        $('#gameOverMenu').css('display','block');
        s.isGameOver = true;
        
        let currentUser = [""+this.getUserName(),+this.getScore()]; 
        console.log(currentUser);
        storage.getAllUsersFromStorage();
         uiM.fillTable(storage.setUserToStorage(currentUser));
    },
    startGame: function () {
        $('#startMenu').css('display','none');
        $('#inGameUI').css('display','block');
        
        s.isGameOver = false;
        s.gameTime = 0;
        s.score = 0;
         uiM.enableTurnMainBtn();
    },


    goToMainMenu: function() {
        $('#gameOverMenu').css('display','none');
        $('#startMenu').css('display','');
        $('#startMenu').find('#startMenuInput').first().focus();
        $('#inGameUI').css('display','none');
        // find(entities,{'name':'player'}).pos = [50, Renderer.settings.canvas.height / 2];
    },
    displayScore(){
        s.scoreEl.innerHTML = s.score;
    },
    getScore(){
        return s.score;
    },
    setScore(val){
        s.score = val;
        this.displayScore();
    },
    setUserName(name){
        s.userName = name;
    },
    getUserName(name){
        return s.userName;
    },
    changeScoreOn(val) {
        s.score+=val;
        this.displayScore();
    },
    setUserSpell(name){
        s.userSpell = name;
    },
    getUserSpell(){
        return s.userSpell;
    },
    setEnemySpell(name){
        s.enemySpell = name;
    },
    getEnemySpell(){
        return s.enemySpell;
    },
    setTaskSolved(bullean) {
        s.isTaskSolved = bullean;
    }

}


export {LevelManager as default}