import * as uiM from './../managers/uiM.js';
import * as mNM from './../managers/monsterNameM.js';



export function init() {
    uiM.init();
    //Start Menu
    uiM.startMenuStartBtn.click( (e)=>{uiM.setInGameUIPlayerName(uiM.startMenuInput.val())} );
    //In Game Menu
    uiM.setInGameUIEnemyName(mNM.createRandomMName());
    uiM.turnMainBtn.click( (e)=>{uiM.openSmallModalMenu();} );

    $(document).on("keydown", () => {
        if($('#inGameUI').css("display") != 'none' && $('#startMenu').css("display") != undefined  && !uiM.turnMainBtn.prop("disabled")) {
            if(event.key == 'Enter'){
                uiM.turnMainBtn.click();
           }
        }
    });
    //Module Menu
    
    
    //Small Module Menu
    
}

