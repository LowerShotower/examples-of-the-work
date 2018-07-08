import  Monster  from './monster';
import * as uiM from './../managers/uiM';
import {find, findIndex, remove,forEach } from 'lodash-es';

class Enemy extends Monster {
    constructor(pos,sprite) {
        super(pos);
        this.name = 'enemy';
        this.health = 100;
        this.sprite = null;
        this.savePos (this);
        this.idleAnim = new Animation('idle',this.getIdleSprites());
        this.attackAnim = new Animation('attack', this.getAttackSprites());
        this.attackedAnim = new Animation('attacked', this.getAttackedSprites());
        this.animator = new Animator([this.idleAnim,this.attackAnim, this.attackedAnim], 'idle', this.name);
    }
    getIdleSprites(){
// this.head, tempProgress,  max, direction, speed, repStyle(once,repeat,bounce), [sprite pos, sprite frames, sprite speed]
        let name = 'idle',
            coeff = 0.2,
            st = 'bounce',
            names = ['head','body','lArm','rArm','legs'],
            head = this.m[name][names[0]][this.N[0]],
            body = this.m[name][names[1]][this.N[1]],
            lArm = this.m[name][names[2]][this.N[2]],
            rArm = this.m[name][names[3]][this.N[3]],
            legs = this.m[name][names[4]][this.N[4]];

        return [[this[names[0]], 0, 2, [-1,1], head.speed*coeff, st,1,    [head.sp, head.frs, head.speed, head.once]],
                [this[names[1]], 0, 1, [0,1],  body.speed*coeff,st,1,     [body.sp, body.frs, body.speed, body.once]],
                [this[names[2]], 0, 2, [-1,1], lArm.speed*coeff, st,1,    [lArm.sp, lArm.frs, lArm.speed, lArm.once]],
                [this[names[3]], 0, 2, [1,1],  rArm.speed*coeff, st,1,    [rArm.sp, rArm.frs, rArm.speed, rArm.once]],
                [this[names[4]], 0, 1, [1,0],  legs.speed*coeff,st,1,     [legs.sp,legs.frs, legs.speed, legs.once]]];
    }

    getAttackSprites(){
        // this.head, tempProgress,  max, direction, speed, repStyle(once,repeat,bounce), [sprite pos, sprite frames, sprite speed]
                let name = 'attack',
                    coeff = 0.2,
                    st = 'bounce',
                    names = ['head','body','lArm','rArm','legs'],
                    head = this.m[name][names[0]][this.N[0]],
                    body = this.m[name][names[1]][this.N[1]],
                    lArm = this.m[name][names[2]][this.N[2]],
                    rArm = this.m[name][names[3]][this.N[3]],
                    legs = this.m[name][names[4]][this.N[4]];
        
                return [[this[names[0]], 0, 1, [1,1], head.speed*coeff, st,1,    [head.sp, head.frs, head.speed, head.once]],
                        [this[names[1]], 0, 1, [0,1],  body.speed*coeff,st,1,     [body.sp, body.frs, body.speed, body.once]],
                        [this[names[2]], 0, 1, [1,1], lArm.speed*coeff, st,1,    [lArm.sp, lArm.frs, lArm.speed, lArm.once]],
                        [this[names[3]], 0, 1, [1,1],  rArm.speed*coeff, st,1,    [rArm.sp, rArm.frs, rArm.speed, rArm.once]],
                        [this[names[4]], 0, 1, [1,0],  legs.speed*coeff,st,1,     [legs.sp,legs.frs, legs.speed, legs.once]]];
            }

    getAttackedSprites(){
        // this.head, tempProgress,  max, direction, speed, repStyle(once,repeat,bounce), [sprite pos, sprite frames, sprite speed]
                let name = 'attacked',
                    coeff = 0.2,
                    st = 'bounce',
                    names = ['head','body','lArm','rArm','legs'],
                    head = this.m[name][names[0]][this.N[0]],
                    body = this.m[name][names[1]][this.N[1]],
                    lArm = this.m[name][names[2]][this.N[2]],
                    rArm = this.m[name][names[3]][this.N[3]],
                    legs = this.m[name][names[4]][this.N[4]];
        
                return [[this[names[0]], 0, 2, [0,1], head.speed*coeff, st,1,    [head.sp, head.frs, head.speed, head.once]],
                        [this[names[1]], 0, 2, [0,1],  body.speed*coeff,st,1,     [body.sp, body.frs, body.speed, body.once]],
                        [this[names[2]], 0, 1, [1,1], lArm.speed*coeff, st,1,    [lArm.sp, lArm.frs, lArm.speed, lArm.once]],
                        [this[names[3]], 0, 1, [1,1],  rArm.speed*coeff, st,1,    [rArm.sp, rArm.frs, rArm.speed, rArm.once]],
                        [this[names[4]], 0, 1, [1,0],  legs.speed*coeff,st,1,     [legs.sp,legs.frs, legs.speed, legs.once]]];
            }

    update(e,dt,entities){
        
    }
    castSpell(){
        setTimeout(() => {
            this.animator.setAnimation('attack',true); 
        }, 100);
    }

    beingAttacked(){
        this.animator.setAnimation('attacked',true); 
    }

    decreaseH(val){ 
        this.health -= val;
        uiM.setEnemyH(this.health);
        return this.health;
    }

    setH(val){
        this.health = val;
        uiM.setEnemyH(this.health);
    }

    deletBody(arr){
        forEach(arr, (v,k)=>{
            remove( entities, find(entities, this[v]) );
        })
        remove( entities, find(entities, this) );
        
    }

}

export {Enemy }


