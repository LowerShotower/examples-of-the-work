
import {chain,concat,value,forEach,bind,map,find} from 'lodash-es';

class Animation {
    // this.head, ch tempProgress, max, direction, time, repStyle(once,repeat,bounce)
       constructor(name,animArr,condition) {
        this.name = name;
        this.condition = condition||null;
        this.animArr = animArr;
        this.done = true;
        this.once = false;
        
    }
    animate (dt){
        // [this.head, 0, 5, [0,-1], 24, 'bounce',1, sprPos, sprFrames],
        
        for (let i = 0; i < this.animArr.length; i++) {
            let an= this.animArr[i];
            let speed = an[4];
            let max = an[2];
            let part = an[0];
            let normal =  Vector.normal(an[3]);
            let stepVect = Vector.multiply(normal, speed*dt);
            let stepDist = Vector.vectToDist(stepVect);

            switch (an[5]) {
                case 'bounce':
                    // if(an[1] == 0){part.savePos(part);}
                    if( an[1] >= 0 && an[1] <= max){
                        // if(part.name == 'explosion'){console.log(part.i);console.log(part.pos)}
                        an[1]+=stepDist*an[6];
                        if(an[1]>max){ part.translate(Vector.multiply(stepVect,(stepDist-(an[1]-max)))) }
                        else if (an[1]<0) {part.translate(Vector.multiply(stepVect,(stepDist+an[1])))}
                        else{part.translate(stepVect)};
                        this.done = false;
                    } 
                    if(an[1] < 0){
                        an[3] = Vector.reverse(an[3]);
                        an[1] = 0; an[6]=-an[6];
                        this.done = true;
                        part.implementSavedPos(part);
                    }
                    if(an[1] > max){
                        an[3] = Vector.reverse(an[3]); an[1] = max; an[6]=-an[6];
                    }
                break;

                case 'move':
                if( an[1] >= 0 && an[1] <= max){
                    part.translate(stepVect); an[1]+=stepDist*an[6];
                    this.done = false;
                }
                if(an[1] > max){
                    an[1] = max;
                    this.done = true;
                }
                break;
            }
        }
    };

    setAnimFrames(){
        forEach(this.animArr,(e,i)=>{
            e[0].sprite.index = 0;
            e[0].sprite.done = false;

            e[0].sprite.pos = e[7][0];
            e[0].sprite.frames = e[7][1];
            e[0].sprite.speed = e[7][2];
            e[0].sprite.once = e[7][3]||false;
        });
    }
};

class Animator {
    constructor(animList, entryState, objName) {
        this.objName = objName;
        this.animList = animList;
        this.animStates = map(animList,el=>el.name);
        this.entryState = entryState;
        this.prevAnimation = null;
        this.curAnimation = entryState;
        this.animIsSetted = false;
        events.on('updateEachFrame', bind(this.animatorLooping,this));
    }
    animatorLooping (e,dt,entities){
        for(let i=0; i<this.animStates.length; i++){
            if (this.curAnimation == this.animStates[i]){
                if( this.curAnimation!=this.prevAnimation){
                    this.animList[i].setAnimFrames();
                }
                this.animList[i].animate(dt);
                this.prevAnimation = this.curAnimation;
                if(this.animList[i].done == true){
                    if(this.animList[i].once == true){
                        window.events.trigger("animEnded", [this.objName,this.animList[i].name]);
                        this.curAnimation = this.entryState;
                        this.animList[i].once == false;
                    }
                    this.animList[i].done = false;
                }
            }
        }
    }
    setAnimation(name,once){
        find(this.animList,['name', name]).once = true;
        this.curAnimation = name;

    }

}

window.Animation = Animation;
window.Animator = Animator;