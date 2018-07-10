import html from './index.html';
import './index.scss';

export let
    //Start Menu
    startMenuInput,
    startMenuStartBtn;

export function init (){
    addHtml($("#game"));
    startMenuInput = $('#startMenuInput');
    startMenuStartBtn = $('#startMenuStartBtn');
}

// *************************** Start Menu ********************************
export function getStartMenuInputVal() {
    return  $('#startMenuInput').val();
}

function addHtml (parent){
    parent.append(html);
}
