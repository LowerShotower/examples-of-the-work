
import './index.scss';
import html from './index.html';

let loadingScreen;
export function init() {
    addHtml('body');
    loadingScreen = $('#loadingScreen');
}
init();

function addHtml (stringParent){
    $(stringParent).prepend(html);
}

export function show() {
    loadingScreen.css('display', 'flex');
}

export function hide() {
    loadingScreen.css('display', 'none');
}