import  '../components/events.js';
import initGame from '../controllers/GameC';
import  gameHtml from './../../html/game.html'


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
    console.log('ufff');
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
        initGame(createCanvas());
        // $('#playStartBtn').off("keydown");
    });
});
