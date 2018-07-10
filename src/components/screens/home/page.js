import  './../../library/events.js';
import initGame from '../game/GameC';
import  gameHtml from './../game/game.html';

import * as loadingScreen from './../../modals/loading-screen/index';

import './page.scss';
import './img/clouds1.png';

function initPage(name,where, whatToDelete) {

     document.body.querySelector(where).innerHTML  = gameHtml;

 }

function createCanvas () {
    // Create the canvas
    let canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    canvas.classList.add("gameCanvas");
    canvas.width = 640;
    canvas.height = 480;
    $('#game').append(canvas);
    return canvas;
}
$(document).on("keydown",(event) => {
    if(event.key == 'Enter') {
        $('#playStartBtn').click();
    }
});
$('#playStartBtn').on('click', function(){
    loadingScreen.show();
    console.log('hah');
    initPage('game','.main-content-wrapper');
    $('.main-content-wrapper').addClass('alt');
    resources.load([
        'img/entities.png',
        'img/attacks.png',
        'img/explosions.png',
        'img/terrain.jpg',
        'img/terrain2.jpg'
    ]);
    events.on("resourcesWasLoaded", ()=>{
        waitFor(800).then( ()=>{  
            initGame(createCanvas());
            loadingScreen.hide(); 
        } )
    });
});

async function waitFor(msec) {
    await new Promise((resolve, reject) => setTimeout(resolve, msec));
}