
import {sortBy,orderBy,reverse,} from 'lodash-es';



export let storage = localStorage;



Storage.prototype.setUserToStorage = function(currUser) { 
    let tempUsers = this.getAllUsersFromStorage();
    let orderedUsers = this.addToOrderedArray(tempUsers, currUser);
    this.setAllUsersToStorage(orderedUsers);
    return orderedUsers;
}

Storage.prototype.getAllUsersFromStorage = function() { 
    if(this["listOfUserss"] == undefined) {
        return [];
    } else { return JSON.parse(this["listOfUserss"])}
}

Storage.prototype.addToOrderedArray = function(tempUsers, currUser){
    tempUsers.push(currUser);
    let orderedArray = reverse(sortBy(tempUsers, (o)=>{ return o[1]}));
    if(orderedArray.length > 5){
        orderedArray.length = 5;
    }
    return orderedArray;
}

Storage.prototype.setAllUsersToStorage = function(orderedUsers){
    this['listOfUserss'] = JSON.stringify(orderedUsers);
}

