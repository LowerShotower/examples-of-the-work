import  Humanoid  from './humanoid';
import * as uiM from './../managers/uiM';
import {find} from 'lodash-es';

 class Player extends Humanoid{
    constructor(pos,userName,N) {
        super(pos,N);
        this.name = 'player';
        this.userName = 'userName';
        this.health = 100;
        this.sprite = null;
        this.savePos (this);
        this.idleAnim = new Animation('idle',this.getIdleSprites());
         this.attackAnim = new Animation('attack',this.getAttackSprites());
         this.attackedAnim = new Animation('attacked',this.getAttackedSprites());
        this.animator = new Animator([this.idleAnim, this.attackAnim, this.attackedAnim], 'idle', this.name);
    }
    getIdleSprites(){
        let name = 'idle',
            st = 'bounce',
            coeff = 0.2,
            names = ['head','body','lArm','rArm','legs'],
            head = this.h[name][names[0]][this.N],
            body = this.h[name][names[1]][this.N],
            lArm = this.h[name][names[2]][this.N],
            rArm = this.h[name][names[3]][this.N],
            legs = this.h[name][names[4]][this.N];
            return [[this[names[0]], 0, 1 , [0,1], head.speed*coeff, st,1,  [head.sp, head.frs, head.speed, head.once]],
                [this[names[1]], 0, 1, [0,1], body.speed*coeff,st,1,     [body.sp, body.frs, body.speed, body.once]],
                [this[names[2]], 0, 2, [0,1], lArm.speed*coeff, st,1,   [lArm.sp, lArm.frs, lArm.speed, lArm.once]],
                [this[names[3]], 0, 2, [1,1], rArm.speed*coeff, st,1,    [rArm.sp, rArm.frs, rArm.speed, rArm.once]],
                [this[names[4]], 0, 1, [1,0], legs.speed*coeff,st,1,     [legs.sp,legs.frs, legs.speed, legs.once]]];
    }

    getAttackSprites(){
        // this.head, tempProgress,  max, direction, time, repStyle(once,repeat,bounce), [sprite pos, sprite frames, sprite speed, once]
        let name = 'attack',
            st = 'bounce',
            coeff = 0.5,
            names = ['head','body','lArm','rArm','legs'],
            head = this.h[name][names[0]][this.N],
            body = this.h[name][names[1]][this.N],
            lArm = this.h[name][names[2]][this.N],
            rArm = this.h[name][names[3]][this.N],
            legs = this.h[name][names[4]][this.N]; 
            return [[this[names[0]], 0, 2 , [-1,4], head.speed*coeff, st,1,  [head.sp, head.frs, head.speed, head.once]],
                    [this[names[1]], 0, 2, [0,1], body.speed*coeff,st,1,     [body.sp, body.frs, body.speed, body.once]],
                    [this[names[2]], 0, 2, [-1,1], lArm.speed*coeff, st,1,   [lArm.sp, lArm.frs, lArm.speed, lArm.once]],
                    [this[names[3]], 0, 2 , [1,1], rArm.speed*coeff, st,1,    [rArm.sp, rArm.frs, rArm.speed, rArm.once]],
                    [this[names[4]], 0, 2, [1,0], legs.speed*coeff,st,1,     [legs.sp,legs.frs, legs.speed, legs.once]]];
    }

    getAttackedSprites(){
        // this.head, tempProgress,  max, direction, time, repStyle(once,repeat,bounce), [sprite pos, sprite frames, sprite speed, once]
        let name = 'attacked',
            st = 'bounce',
            coeff = 0.2,
            names = ['head','body','lArm','rArm','legs'],
            head = this.h[name][names[0]][this.N],
            body = this.h[name][names[1]][this.N],
            lArm = this.h[name][names[2]][this.N],
            rArm = this.h[name][names[3]][this.N],
            legs = this.h[name][names[4]][this.N]; 
            return [[this[names[0]], 0, 3 , [0,1], head.speed*coeff, st,1,  [head.sp, head.frs, head.speed, head.once]],
                    [this[names[1]], 0, 3, [0,1], body.speed*coeff,st,1,     [body.sp, body.frs, body.speed, body.once]],
                    [this[names[2]], 0, 3, [0,1], lArm.speed*coeff, st,1,   [lArm.sp, lArm.frs, lArm.speed, lArm.once]],
                    [this[names[3]], 0, 3 , [0,1], rArm.speed*coeff, st,1,    [rArm.sp, rArm.frs, rArm.speed, rArm.once]],
                    [this[names[4]], 0, 1, [1,0], legs.speed*coeff,st,1,     [legs.sp,legs.frs, legs.speed, legs.once]]];
    }

    update(e,dt,entities){
        if(input.isDown('space')){
            this.animator.setAnimation('attack',true);
        }
    }

    castSpell(){
        this.animator.setAnimation('attack',true);
    }

    beingAttacked(){
        this.animator.setAnimation('attacked',true); 
    }

    decreaseH(val){ 
        this.health -= val;
        uiM.setPlayerH(this.health);
        return this.health;
    }
    increaseH(val){ 
        this.health += val;
        if(this.health>100){
            this.health = 100;
        }
        uiM.setPlayerH(this.health);
        return this.health;
    }
    setH(val){
        this.health = val;
        uiM.setPlayerH(this.health);
    }
}

export {Player }