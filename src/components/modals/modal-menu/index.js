import * as taskM from './../../tasks/taskManager';
import * as tMenu from './../../tasks/tasksMenu/index';
import lM from  './../../screens/game/LevelM';

import * as inGameMenu from './../in-game-menu/index';

import html from './index.html';
import './index.scss';

export let modalMenu,
        closeModalBtn,
        currTask = null,
        checkEnterButton = false;

export function init (){
    addHtml($("#game"));
    modalMenu = $("#modalMenu");
    closeModalBtn = $("#closeModalBtn");
}

function addHtml (parent){
    parent.append(html);
}

// *************************** Modal Menu ********************************
async function waitFor(msec) {
    await new Promise((resolve, reject) => setTimeout(resolve, msec));
}

export function openModalMenu(){
    tMenu.loadTo('#modalMenu');
    modalMenu.css("display","block");
    $("#modalMenu").find('#tasks').children('.menu-el').first().focus();
    tMenu.tasksMenu.on('tasksMenuSubmitted', ()=>{
        tMenu.clear();
        instantiateTask(tMenu.selectedTask);
    } );

    closeModalBtn.click( (e)=>{closeModalMenu();} );
    $(document).on('keydown', (event) => {
        if (event.key == 'Escape') {
            closeModalBtn.click();
        }
    });
}

export function instantiateTask(name){
    currTask = taskM.generateTask(name);
    currTask.instantiateHtmlAndJsTo('#modalMenu');
    waitFor(400).then( () => {currTask.setKeyboardReadyBtn();} );


    currTask.taskBlock.on('answerSubmitted', ()=>{
        lM.setTaskSolved(currTask.answerState);
        if(currTask.answerState){
            waitFor(2000).then(()=>{closeModalMenu(); events.trigger('playerTurn');});
            waitFor(2000).then(()=>{closeModalMenu(); events.trigger('playerTurn');});
        }else{
            waitFor(2000).then(()=>{closeModalMenu(); events.trigger('enemyTurn');});
        }
    });
}

export function closeModalMenu(){
    modalMenu.css("display","none");
    if(currTask != null){ currTask.clear(); };
    currTask = null;
    tMenu.clear();
    checkEnterButton =false;
    inGameMenu.enableTurnMainBtn();
}

export  function setCheckEnterButton(bul) {
    checkEnterButton = bul;
}

export function disableCloseModalBtn(){
    closeModalBtn.prop('disabled', true);
}

export function enableCloseModalBtn(){
    closeModalBtn.prop('disabled', false);
}