import * as mNM from './../managers/monsterNameM';

import * as modalMenu from './modal-menu/index';
import * as smallModalMenu from './small-modal-menu/index';
import * as gameOverMenu from './game-over-menu/index';
import * as inGameMenu from './in-game-menu/index';
import * as startMenu from './start-menu/index';

export function init() {
    //Start Menu
    startMenu.init();
    //inGame UI
    inGameMenu.init();
    //Modal menu
    modalMenu.init();
    //Small modal menu
    smallModalMenu.init();
    //Game Over Menu
    gameOverMenu.init();
    //Start Menu
    startMenu.startMenuStartBtn.click( (e)=>{inGameMenu.setInGameUIPlayerName(startMenu.startMenuInput.val())} );
    //In Game Menu
    inGameMenu.setInGameUIEnemyName(mNM.createRandomMName());
    inGameMenu.turnMainBtn.click( (e)=>{smallModalMenu.openSmallModalMenu();} );

    $(document).on("keydown", () => {
        if($('#inGameUI').css("display") != 'none' && $('#startMenu').css("display") != undefined  && !inGameMenu.turnMainBtn.prop("disabled")) {
            if(event.key == 'Enter'){
                inGameMenu.turnMainBtn.click();
            }
        }
    });
}

