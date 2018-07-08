import {bind} from 'lodash-es';

export default class Entity {
    constructor(){
        entities.unshift(this);
        events.on('updateEachFrame', bind(this.update, this));
        this.i = entities.length-1;
        this.savedPos=[];
        
    }
    translate(point) {
        this.pos =  Vector.sum(this.pos,point);
    }
    moveTo(point){
        this.pos = point;
    }
    savePos (part) {
       if(typeof(part.pObj) !='undefined'&& typeof(part.pObj)!='null'){
            part.savedPos = part.ajustPos;
       }
       else {
           part.savedPos = part.pos;
       }
    }
    implementSavedPos(part){
        if(typeof(part.pObj) !='undefined' && typeof(part.pObj)!='null'){
            part.ajustPos =  part.savedPos;
       }
       else {
           part.pos = part.savedPos;
       } 
    }
     update(){

     };
     
}