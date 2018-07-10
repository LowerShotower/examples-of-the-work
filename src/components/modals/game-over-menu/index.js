
import {forEach} from 'lodash-es';

import html from './index.html';
import './index.scss';

export let  
    scoreTable;

export function init (){
    //Game Over Menu
    addHtml($("#game"));
    scoreTable = $("#scoreTable");
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

function addHtml (parent){
    parent.append(html);
}