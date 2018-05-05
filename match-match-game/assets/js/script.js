//actually used in game amount deck of cards;
let cards;

//whole avaluable acount of cards
let defaultAmount = 24;

// cards array holds all cards
let deckOfCards = [];
for (let i = 0; i < defaultAmount; i++) {
    let div= document.createElement('div');
    div.className='card ';
    div.innerHTML = '<div class = "face front"></div><div class = "face back"></div>';
    if (i%2==0) {
        div.type = String(i/2); 
    } else {
        div.type = String((i-1)/2);
    }
    deckOfCards.push(div);
}


// deck of all cards in game
const deck = document.getElementById("card-deck");

//clone description content
let description = document.querySelector('.description').cloneNode(true);

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1");

 //login modal 
 let loginModal = document.getElementById("popup2");

 //login form 
 let loginForm = document.getElementById('loginForm');

// start button
let startBtn = document.querySelector('.start-btn');

// change user button
let changeUserBtn = document.querySelector('.change-user-btn');

// array of all btns
let refs = document.querySelectorAll('a');

// array of dropdown btns
let ddBtns = document.querySelectorAll('.dropdown-btn');

let storage = localStorage;

 // array for opened cards
var openedCards = [];

var gameSettings = new Settings('first','easy');

let enterSubmitEvent = new Event('submit');

let numberOfPositions = 10;

function Settings (skirt,difficulty) {
    this.skirt = skirt;
    var difficulty;
    this.difficulty = difficulty;
}

class User {
    constructor(firstName, lastName, email, difficulty, skirt){
        this.firstName = firstName||'noName';
        this.lastName = lastName||'noName';
        this.email = email||'noEmail';
        this.difficulty = difficulty || 'easy';
        this.skirt = skirt || 'first';
    }

    setUser (firstName,lastName,email,difficulty,skirt, user) {
        if(typeof(user) != 'Object') { user = this}
        user.firstName = firstName||'noName';
        user.lastName = lastName||'noName';
        user.email = email||'noEmail';
        user.difficulty = difficulty || 'easy';
        user.skirt = skirt || 'first';
    }
}

let currentUser = new User();

Storage.prototype.createScoreTable = function (numberOfPositions) {
    let positions = new Array(numberOfPositions);
    for (let i = 0; i < positions.length; i++) {
        if (this['pos'+i+'fN'] == undefined){
        this['pos'+i+'fN'] = '';
        this['pos'+i+'lN'] = '';
        this['pos'+i+'em'] = '';
        this['pos'+i+'moves'] = '';
        this['pos'+i+'stringMoves'] = '';
        this['pos'+i+'time'] = '';
        this['pos'+i+'stringTime'] = '';
        }
    }
}

Storage.prototype.setScoreTable = function (table) {
    for (let i = 0; i < table.length; i++) {
        this['pos'+i+'fN'] = table[i].firstName;
        this['pos'+i+'lN'] = table[i].lastName;
        this['pos'+i+'em'] = table[i].email;
        this['pos'+i+'moves'] = table[i].moves;
        this['pos'+i+'time'] = table[i].time;
        this['pos'+i+'stringMoves'] = table[i].stringMoves;
        this['pos'+i+'stringTime'] = table[i].stringTime;
    }
}

Storage.prototype.getScoreTable = function() {
    let table = [];
    for (let i = 0; i < numberOfPositions; i++) {
        table.push({
            firstName: this['pos'+i+'fN'],
            lastName: this['pos'+i+'lN'],
            email: this['pos'+i+'em'],
            moves: this['pos'+i+'moves'],
            stringMoves: this['pos'+i+'stringMoves'],
            time: this['pos'+i+'time'],
            stringTime: this['pos'+i+'stringTime']
        });
    }
    return table;
}

Storage.prototype.saveUserToScoreTable = function(currentUser, moves, time){
    let table = this.getScoreTable();
    defLength = table.length;
    for (let i = 0; i < table.length; i++) {
        if (table[i].moves == '' || moves < table[i].moves || moves == table[i].moves && time <= table[i].time) {
            table.splice(i,0, {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                moves: moves,
                stringMoves: moves+'moves',
                time: time,
                stringTime: Math.floor(time/60)+'min'+time%60+'sec'
            });
            table.length = defLength;
            break;
        }
    }
    this.setScoreTable(table);
}

Storage.prototype.getListOfUsers = function(){
    return JSON.parse(this['listOfUsers']);
 }

Storage.prototype.setListOfUsers = function(listOfUsers){
    this['listOfUsers'] = JSON.stringify(listOfUsers);
 }

Storage.prototype.getSettingsOfUser = function(currentUser){
    let listOfUsers = JSON.parse(this['listOfUsers']);
    for(let i = 0; i < listOfUsers.length; i++){
        if(listOfUsers[i].firstName == currentUser.firstName && listOfUsers[i].lastName == currentUser.lastName && listOfUsers[i].email == currentUser.email){
            currentUser.difficulty = listOfUsers[i].difficulty;
            currentUser.skirt = listOfUsers[i].skirt;
            return true;
        }
    } return false;
}

Storage.prototype.setSettingsOfUser = function(currentUser){
    let listOfUsers = this.getListOfUsers();
    for(let i = 0; i < listOfUsers.length; i++){
        if(listOfUsers[i].firstName == currentUser.firstName && listOfUsers[i].lastName == currentUser.lastName && listOfUsers[i].email == currentUser.email){
            listOfUsers[i].difficulty  = currentUser.difficulty;
            listOfUsers[i].skirt  = currentUser.skirt;
            this.setListOfUsers(listOfUsers);
            return true;
        }
    } return false;
}

 //storage.clear();
Storage.prototype.activateUserSettings = function(currentUser){
    let listOfUsers;
    if (this['listOfUsers'] == undefined) {
        listOfUsers =[];
        listOfUsers.push(currentUser);
        this.setListOfUsers(listOfUsers);
    } else {
        if(!this.getSettingsOfUser(currentUser)){
            listOfUsers = JSON.parse(this['listOfUsers']);
            listOfUsers.push(currentUser);
            this.setListOfUsers(listOfUsers);
        }
    }
    // console.log(this['listOfUsers']);
}


//calc amount of cards depending on game difficulty
function calcAmountByDifficulty(mode) {
 switch (mode) {
     case 'easy':  return 10;
     case 'medium': return 16;
     case 'hard':  return 24;
 }
}

//change card size dependin on difficulty of the game
function calcSizeByDifficulty(card, difficulty){
    switch (difficulty) {
        case 'easy':
            setCardSize(card,'13rem','13rem');
        break;
        case 'medium':
            setCardSize(card,'9rem','9rem');
        break;
        case 'hard':
            setCardSize(card,'9rem','9rem');
        break;
    }
}

//set  a certain card size
function setCardSize(card,w,h){
 card.style.height = h;
 card.style.width = w;
}

// set image of card
function setCardImage(card, type, difficulty){

    card.children[1].style.backgroundPositionY = 50 +'%';

    if (difficulty == 'easy'){

    card.children[1].style.backgroundPositionX = 45-type*203 +'px';
    } else {
        card.children[1].style.backgroundPositionX = 33-type*140 +'px';
    }
}

//set skirt
function setSkirt (card,type,difficulty) {
    card.children[0].style.backgroundPositionY = '50%';
    if (difficulty=='easy') {
        switch (type) {
            case 'first':
            card.children[0].style.backgroundPositionX = '50px';
            break;
            case 'second':
            card.children[0].style.backgroundPositionX = '-210px';
            break;
            case 'third':
            card.children[0].style.backgroundPositionX = '-470px';
            break;
        }
    } else {
        switch (type) {
            case 'first':
            card.children[0].style.backgroundPositionX = ' 40px';
            break;
            case 'second':
            card.children[0].style.backgroundPositionX = ' -145px';
            break;
            case 'third':
            card.children[0].style.backgroundPositionX = '-325px';
            break;
        }
    }
}

// shuffles cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};


//  function to that generate a new play 
function startGame(){
    //get user prefs from current game ajastments
    currentUser.difficulty = gameSettings.difficulty;
    currentUser.skirt = gameSettings.skirt;
    //and save it to storage
    storage.setSettingsOfUser(currentUser);

    openedCards = [];
    //generage array of cards for the game
    cards = deckOfCards.slice(0, calcAmountByDifficulty(gameSettings.difficulty));
    
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card and add cards to the deck
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            setSkirt(item, gameSettings.skirt,gameSettings.difficulty);
            calcSizeByDifficulty(item,gameSettings.difficulty);
            setCardImage(item,item.type, gameSettings.difficulty);
            deck.appendChild(item);
        });

    // loop to add event listeners to each card
    for (let i = 0; i < cards.length; i++){
        let card = cards[i];
        card.classList.remove("show", "open", "match", "disabled");
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
    };

    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    timeInSeconds = 0;
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sec";
    clearInterval(interval);
    startTimer();
}


//  toggles open and show class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("disabled");
}

//  add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        disable();
        setTimeout(function() {
            moveCounter();
            if(openedCards[0].type === openedCards[1].type){
                matched();
            } else {
                unmatched();
            }
        }, 600);
    }
};

//  when cards match
function matched(){
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    setTimeout(function(){
        openedCards[0].classList.add("disabled");
        openedCards[1].classList.add("disabled");
        enable();
        openedCards = [];
         if (matchedCard.length==cards.length) {
            congratulations(); 
         }
    },0 );
}

//  when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    openedCards[0].classList.add("close");openedCards[1].classList.add("close");
    setTimeout(function(){
        openedCards[0].classList.remove("open","unmatched");
        openedCards[1].classList.remove("open","unmatched");
        openedCards[0].classList.remove("close");openedCards[1].classList.remove("close");
        enable();
        openedCards = [];
    },500  );
}

// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

//  enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

//  count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
}

//  game timer
var second = 0, minute = 0; hour = 0, timeInSeconds = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timeInSeconds++;
        second++;
        timer.innerHTML = minute+"min "+second+"sec";
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//  congratulations when all cards match, show modal and moves, time and rating
function congratulations(){
    //disable cards from clicking
    disable();
    //clear timer
    clearInterval(interval);
    finalTime = timer.innerHTML;
     //save current user to the record table
     storage.saveUserToScoreTable(currentUser, moves, timeInSeconds);

    // show congratulations modal
    modal.classList.add("show");

    //showing move, rating, time on modal
    document.getElementById("finalMove").innerHTML = moves;
    // document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = finalTime;

    let currentTable = storage.getScoreTable();

    document.getElementById('scoreTable').innerHTML ='';
    for (let i = 0; i < currentTable.length; i++) {
        let curPos = document.createElement('li');
        let posText ='<div>'+currentTable[i].firstName+' '
                    +currentTable[i].lastName+'</div><div>'
                    +currentTable[i].stringMoves+'  '
                    +currentTable[i].stringTime+'</div>';
        curPos.innerHTML = posText;
        document.getElementById('scoreTable').appendChild(curPos);
    }
    //closeicon on modal
    closeModal();
}

//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        deck.innerHTML='';
        deck.appendChild(description);
    });
}

//for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}

//prevent btns default
function preventDef(evt) {
    evt.preventDefault();
}

function showLoginForm() {
    loginModal.classList.add('show');
    deck.innerHTML='';
    deck.appendChild(description);
    document.addEventListener('keyup', (e) => { keyIsUp(e.key); });
}

function closeLoginForm(){
    if (loginModal.classList.contains('show')) {
        loginModal.classList.remove('show');
    }
}

function keyIsUp(key) {
    if (key == 'Escape'){
         closeLoginForm();
    } else if (key == 'Enter'){
        if (loginModal.classList.contains('show')) {
            loginForm.dispatchEvent(enterSubmitEvent);
        }
    }
}

//event listeners and different actions
storage.createScoreTable(numberOfPositions);

showLoginForm();

changeUserBtn.addEventListener('click', showLoginForm);

startBtn.addEventListener("click", startGame);

//prevent link event on 'a' tags
refs.forEach(function (item) {item.addEventListener("click", preventDef);});

// dropdown buttons actions
ddBtns.forEach(function (item) {
    let ddContent = item.nextElementSibling;
    item.addEventListener("click", function () {
        ddContent.classList.toggle('active');
    });
    //actions on dropdown menu
    ddContent.addEventListener('click', (e) => {
        Array.prototype.forEach.call(e.currentTarget.children, i => {i.setAttribute('state', 'none');});
        e.target.setAttribute('state', 'selected');
        if (e.currentTarget.classList.contains('skirt')){
            gameSettings.skirt = e.target.className;
        } else if(e.currentTarget.classList.contains('difficulty')) {
            gameSettings.difficulty = e.target.textContent;
        }
        ddContent.classList.toggle('active',false);
    });
});

// action to close dropdown menu as we ckick somewhere on the window
document.body.addEventListener('click', function (e) {
    if (e.target!=ddBtns[0] && e.target!=ddBtns[1]) {
        ddBtns.forEach(function (item) {
            if (item.nextElementSibling.classList.contains('active')){
                item.nextElementSibling.classList.remove('active');
            }
        })
    }
})



//actions after sublit button clicked
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    //whrite temp current user
    currentUser.setUser(loginForm.elements['firstName'].value,
                        loginForm.elements['lastName'].value,
                        loginForm.elements['email'].value);

    //load settings fromm user, if he already exist
    storage.activateUserSettings(currentUser);
    //set game setting depending on loaded user settings
    if(storage.getSettingsOfUser(currentUser)){
        gameSettings.difficulty = currentUser.difficulty;
        gameSettings.skirt = currentUser.skirt;
        //as we've load out data to gameSettings, implement it to html elements
        Array.prototype.forEach.call(document.querySelector('.skirt').children, i => {i.setAttribute('state', 'none');});
        document.querySelector('.skirt').querySelector('.'+gameSettings.skirt).setAttribute('state', 'selected');
        //the same
        Array.prototype.forEach.call(document.querySelector('.difficulty').children, i => {i.setAttribute('state', 'none');});
        document.querySelector('.difficulty').querySelector('.'+gameSettings.difficulty).setAttribute('state', 'selected');
    }
    loginModal.classList.remove('show');
})




