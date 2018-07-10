import * as startMenu from './../start-menu/index';
import lM from  './../../screens/game/LevelM';

import html from './index.html';
import './index.scss';

export let 
    //inGame UI
    enemyName,
    playerName,
    enemyH,
    playerH,
    enemyNick,
    turnMainBtn;

    export function init (){
        addHtml($("#game"));
        enemyName = $('#enemyName');
        playerName = $('#playerName');
        enemyH = $('#enemyH');
        playerH = $('#playerH');
        enemyNick = $('#enemyNick');
        turnMainBtn = $('#turnMainBtn');
    }

    function addHtml (parent){
        parent.append(html);
    }
    

    // *************************** InGame Menu ********************************
export  function  setInGameUIPlayerName(name){
    let userName;
    if(startMenu.startMenuInput.val()!= ''){
        userName = name||startMenuInput.val();
    } else {
        userName = 'Tommy <small>z</small>zZ';
    }
    lM.setUserName(userName);
    playerName.html(userName);
};

export function setInGameUIEnemyName(name){
    enemyNick.html(name[1]);
    enemyName.html(name[0]);
}

export function disableTurnMainBtn(){
    turnMainBtn.prop('disabled', true);
}

export function enableTurnMainBtn(){
    turnMainBtn.prop('disabled', false);
}

export function setEnemyH(val){
    enemyH.css("width", val+'%');
}

export function setPlayerH(val){
    playerH.css("width", val+'%');
}

export function changeMainBtnText(text){
    turnMainBtn.html(text);
}
