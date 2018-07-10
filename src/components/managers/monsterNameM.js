
import {monsterNames} from '../data/monsterNames';
import {join,nth,forEach} from 'lodash-es';

export function createRandomMName() {
    let tempArr =[];
    forEach(monsterNames, e=>{ tempArr.push(e[Math.floor(Math.random()*(e.length-1))])});
    let nickName = [];
    nickName.push(join(tempArr.splice(0,2),' '));
    nickName.unshift("\"");
    nickName.push("\"");
    join(nickName, '');
    tempArr.push(nickName);
    return tempArr;
}


