import * as taskM from './../tasks/taskManager';
import {forEach,map,join} from 'lodash-es';
import lM from  './../managers/LevelM';
import * as tMenu from './../tasks/tasksMenu/index';

export let 
    //Start Menu
    startMenuInput,
    startMenuStartBtn,
    //inGame UI
    enemyName,
    playerName,
    enemyH,
    playerH,
    enemyNick,
    turnMainBtn,
    //Modal menu
    modalMenu,
    closeModalBtn,
    currTask = null,
    checkEnterButton = false,
    //Small modal menu
    smallModalMenu,
    earthBtn, fireBtn, waterBtn, groundBtn,
    //Game Over Menu
    scoreTable;

export function init (){
    //Start Menu
    startMenuInput = $('#startMenuInput');
    startMenuStartBtn = $('#startMenuStartBtn');
    //inGame UI
    enemyName = $('#enemyName');
    playerName = $('#playerName');
    enemyH = $('#enemyH');
    playerH = $('#playerH');
    enemyNick = $('#enemyNick');
    turnMainBtn = $('#turnMainBtn');
    //Modal menu
    modalMenu = $("#modalMenu");
    closeModalBtn = $("#closeModalBtn");
    //Small modal menu
    smallModalMenu = $("#smallModalMenu");
    earthBtn = $("#earthBtn");
    fireBtn = $("#fireBtn");
    waterBtn = $("#waterBtn");
    groundBtn = $("#groundBtn");
    //Game Over Menu
    scoreTable = $("#scoreTable");

}

// *************************** Start Menu ********************************
export function getStartMenuInputVal() {
    return  $('#startMenuInput').val();
}

// *************************** InGame Menu ********************************
export  function  setInGameUIPlayerName(name){
    let userName;
    if(startMenuInput.val()!= ''){
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
    // disableTurnMainBtn();

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
    enableTurnMainBtn();
}

export  function setCheckEnterButton(bul) {
    checkEnterButton = bul;
}

// export function onAnswerSubmit(){
// }


export function disableCloseModalBtn(){
    closeModalBtn.prop('disabled', true);
}

export function enableCloseModalBtn(){
    closeModalBtn.prop('disabled', false);
}


// *************************** Small modal Menu ********************************

export function closeSmallModalMenu(){
    smallModalMenu.css("display","none");
    smallModalMenu.children('.menu-el').attr('tabindex', 0).off('keydown');
    smallModalMenu.off('click');
}

export function openSmallModalMenu(){
    smallModalMenu.css("display","block");
    disableTurnMainBtn();

    smallModalMenu.click( (e)=>{onSpellSubmit(e.target);} );

    smallModalMenu.children('.menu-el').attr('tabindex', 0).first().focus();
    smallModalMenu.children('.menu-el').attr('tabindex', 0).on('keydown', (event)=> {
        let ct = event.currentTarget;
        if(event.key == 'ArrowLeft' || event.key == 'ArrowUp') { // left or up
                $(ct).prev().focus();
        }
        if(event.key == 'ArrowRight' || event.key == 'ArrowDown') { // right or down
            $(ct).next().focus();
        }
        if(event.key == 'Enter') { // right or down
            onSpellSubmit($(ct).children('p'));
        }
    });
}

export function onSpellSubmit(elem){
    console.log($(elem).html().toLocaleLowerCase());
    lM.setUserSpell($(elem).html().toLocaleLowerCase());
    closeSmallModalMenu();
    openModalMenu();
}

//********************************* Game Over Menu *****************************/


export function fillTable(userList ){
    forEach(userList, (v,k)=>{
        for (let i = 0; i < 2; i++) {
            console.log("v "+ v[i]);
            scoreTable.children("tbody").children("tr:nth-of-type("+(k+1)+")").children("td:nth-of-type("+(i+1)+")").html(v[i]);
            
        }
    })
}


