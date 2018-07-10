import * as inGameMenu from './../in-game-menu/index';
import * as modalMenu from './../modal-menu/index';

import html from './index.html';
import './index.scss';

import lM from  './../../screens/game/LevelM';

export let 
    smallModalMenu,
    earthBtn, fireBtn, waterBtn, groundBtn;

export function init() {
    addHtml($("#game"));
    smallModalMenu = $("#smallModalMenu");
    earthBtn = $("#earthBtn");
    fireBtn = $("#fireBtn");
    waterBtn = $("#waterBtn");
    groundBtn = $("#groundBtn");
}

function addHtml (parent){
    parent.append(html);
}

// *************************** Small modal Menu ********************************
export function closeSmallModalMenu(){
    smallModalMenu.css("display","none");
    smallModalMenu.children('.menu-el').attr('tabindex', 0).off('keydown');
    smallModalMenu.off('click');
}

export function openSmallModalMenu(){
    smallModalMenu.css("display","block");
    inGameMenu.disableTurnMainBtn();

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
    modalMenu.openModalMenu();
}
