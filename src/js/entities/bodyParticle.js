import Entity from './entity';
import {find} from 'lodash-es';

class BodyParticle extends Entity {
    constructor(ajustPos,framePos,frameSize,pObj){ 
        super();
        this.pObj = pObj;
        this.ajustAnchorPoint = [0,0];
        this.anchorPoint = Vector.sum(this.pObj.pos,this.ajustAnchorPoint);
        this.ajustPos = ajustPos;
        this.pos = this.setPos(this.anchorPoint);
        this.originalAjustPos = ajustPos;
        this.savePos (this);
                                    // url,                  pos,                      size,                   speed, frames direction
        this.sprite =  new Sprite('img/entities.png', [framePos[0], framePos[1]], [frameSize[0], frameSize[1]], 10, [0]);
    }
    setPos(anchorPoint){
        return Vector.sum(anchorPoint,this.ajustAnchorPoint,this.ajustPos);
    };
    update() {
    }
    translate(point) {
        this.ajustPos = Vector.sum(point,this.ajustPos);
        this.pos = this.setPos(this.pObj.pos);
    }
    moveTo(point){
        this.pos = point;
    }
}
export class Head extends BodyParticle {
    constructor(ajustment,framePos,frameSize,pObj){
        super( ajustment,framePos,frameSize,pObj);
        this.name = "head";
        this.sprite.frames = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
}
export class Body extends BodyParticle {
    constructor(ajustment,framePos,frameSize,pObj){
        super(ajustment,framePos,frameSize,pObj);
        this.name = "body";
    }
}
export class LArm extends BodyParticle {
    constructor(ajustment,framePos,frameSize,pObj){
        super( ajustment,framePos,frameSize,pObj);
        this.name = "lArm";
    }
}
export class RArm extends BodyParticle {
    constructor(ajustment,framePos,frameSize,pObj){
        super( ajustment,framePos,frameSize,pObj);
        this.name = "rArm";
    }
}
export class Legs extends BodyParticle {
    constructor(ajustment,framePos,frameSize,pObj){
        super( ajustment,framePos,frameSize,pObj);
        this.name = "lags";
    }
}
