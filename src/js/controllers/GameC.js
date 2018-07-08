import {audio} from  '../components/audio.js';
import '../data/frames';
import '../components/resources.js';
import '../components/sprite.js';
import '../components/animator.js';
import '../components/input.js';
import '../components/renderer.js';
import '../components/collision.js';

import '../components/vector.js';
import lM from '../managers/LevelM';
import {Player, Enemy, Explosion} from '../entities/all.js';
import * as uiM from './../managers/uiM.js';
import * as mNM from './../managers/monsterNameM.js';
import * as uiC from './uiC.js';
import { setTimeout } from 'timers';

//********************************************************************************
function initGame(canvas){
Renderer.settings.canvas = canvas;
var ctx = Renderer.settings.ctx = canvas.getContext("2d");
uiC.init();

//************************************************************************************* */
var requestAnimFrame = window.requestAnimationFrame;
var framePerSec =30;
var frameTime = 1/framePerSec;
var tempTime = 0;

// *********************************The main game loop*************************************
var lastTime;
events.on('updateEachFrame', update);
function loop() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;
    if(tempTime<frameTime){
        tempTime+= dt;
    } else if(tempTime>=frameTime){
        events.trigger('updateEachFrame',[tempTime,entities]);
        Renderer.renderAll(isGameOver, entities, tempTime);
        tempTime=0;
    }
    lastTime = now;
    requestAnimFrame(loop);
};

function initPlayField() {
    Renderer.init();
    lM.init();
    lastTime = Date.now();
    Renderer.createTerrain(['img/terrain.jpg','img/terrain2.jpg'],'no-repeat');
     enemy = new Enemy([460,358],'HolyPlayer',0);
     player.setH(100);
     enemy.setH(100);
     lM.setScore(0);
     uiM.setInGameUIEnemyName(mNM.createRandomMName());
     loop();
     window.entities = [];

     exEarth = new Explosion([430,340],3);
     exWater = new Explosion([144,330],2);
     exFire = new Explosion([425,330],1);
      exPoison = new Explosion([425,330],0);
      exPlayer = new Explosion([146,330],0);
      enemy = new Enemy([460,358],'HolyPlayer',0);
     player = new Player([160,330],'EvilMonster',0);
      gameTime = lM.settings.gameTime;
      isGameOver = lM.settings.isGameOver;
};



window.entities = [];

var exEarth = new Explosion([430,325],3);
var exWater = new Explosion([410,320],2);
var exFire = new Explosion([425,320],1);
var exPoison = new Explosion([425,320],0);
var exPlayer = new Explosion([160,315],0);
var enemy = new Enemy([460,358],'',0);
var player = new Player([160,320],'',0);
var gameTime = lM.settings.gameTime;
var isGameOver = lM.settings.isGameOver;
var prevSpell = null;
var earthCounter = 1;

Renderer.init();
    lM.init();
    lastTime = Date.now();
events.on("animEnded", (e,objName,animName) => {

    switch(objName){
        case "player": switch(animName){
                            case "attack":  uiM.disableTurnMainBtn();
                
                                            switch(lM.getUserSpell()){
                                                case "earth": exEarth.explode();
                                                                audio.earthSound.playNext();
                                                                if (prevSpell ==lM.getUserSpell() ){
                                                                    earthCounter += 2;
                                                                } else {earthCounter =1}
                                                                enemy.decreaseH(10*earthCounter);
                                                break;
                                                case "water": exWater.explode();
                                                                audio.waterSound.playNext();
                                                                player.increaseH(Math.floor(Math.random()*25)+10);
                                                break;
                                                case "fire": exFire.explode();
                                                            audio.fireSound.playNext();
                                                            enemy.decreaseH(10*Math.random()+20);
                                                break;
                                                case "poison": exPoison.explode();
                                                                audio.poisonSound.playNext();
                                                                 enemy.decreaseH(20);
                                                break;
                                                }
                            prevSpell = lM.getUserSpell();                    
                            enemy.beingAttacked();
                            break;
                            case "attacked": uiM.changeMainBtnText("Your Turn");
        }
        break;

        case "enemy": 
                        switch(animName){
                            case "attack":  uiM.disableTurnMainBtn();
                                            let l = Math.floor(Math.random()*2);
                                            exPlayer.changeStyleTo(l);
                                            if(l==0){
                                            audio.waterSound.playNext();
                                            } else if(l==1){
                                                audio.fireSound.playNext();
                                            }else{audio.poisonSound.playNext();}
                                            exPlayer.explode();
                                            player.beingAttacked();
                                            player.decreaseH((exPlayer.N+1)*15);
                                            uiM.changeMainBtnText("Your Turn");
                            break;
                            case "attacked": if(enemy.health>0){ events.trigger('enemyTurn'); }
                            break;
        }
        break;

        case "explosion": switch(animName){
                            case "explode": 
                            
                            if(enemy.health<=0){ console.log("You win!");
                            setTimeout(()=>{
                                lM.changeScoreOn(1);
                                uiM.setInGameUIEnemyName(mNM.createRandomMName());
                                enemy.deletBody(['head','body','lArm','rArm','legs']);
                                enemy = new Enemy([460,358],'HolyPlayer',0);
                                enemy.setH(100);
                                audio.musicSound.playNext(true);
                                 },1000
                                )}
                            if (player.health<=0){console.log("You loose!");
                            audio.stopAllAudio();
                            setTimeout(()=>{
                                
                                lM.onGameOver(); isGameOver=true;
                                audio.musicSound.stopCurrent();},1000
                            )}
                            uiM.enableTurnMainBtn();
                            break;
        }
        break;
    }
});

events.on("enemyTurn", (e) => {
    uiM.changeMainBtnText("Monster Turn");
    uiM.disableTurnMainBtn();
    enemy.castSpell();
});

events.on("playerTurn",(e) => {
    uiM.disableTurnMainBtn();
    player.castSpell(lM.getUserSpell());
});
//****************************************************************** */
$('#playAgainBtn').click( function() {
    lM.goToMainMenu();
    lM.setScore(0);
    player.setH(100);
    enemy.setH(100);});



// Update game objects
function update(e, dt, entities) {
    gameTime += dt;
    // if(window.input.isDown('enter') && uiM.checkEnterButton){
    //     uiM.onAnswerSubmit();
    //     uiM.setCheckEnterButton(false);
    // }
};
//************************************************************* */
$('#startMenu').find('#startMenuInput').first().focus();
console.log($('#startMenu').css("display"));
$(document).on("keydown",(event) => {
    if(event.key == 'Enter') {
        if($('#startMenu').css("display") != 'none' && $('#startMenu').css("display") != undefined ) {
            console.log('eeee');
            console.log($('#startMenu').css("display"));
            $('#startMenuStartBtn').click();
        }
    }
});

$('#startMenuStartBtn').click(function() {
    if(resources.isReady()){
            initPlayField();
            lM.startGame();
            audio.musicSound.playNext(true);
    }
});
$('#startMenuSoundBtn').click(function() {

            audio.toggleVolume($(this));
    
});



}

export {initGame as default}




