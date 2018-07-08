import Entity from './entity';
import { Body, Head, LArm, RArm, Legs } from './bodyParticle';
import {find,fill,map} from 'lodash-es';

export default class Monster extends Entity {
    constructor (pos) {
        super();
            this.pos = pos||[460,340];
            this.m = Frames.monsters;
            this.N = map(Array(5),()=> randomFromZeroTo(2));

                                // ajustment      framePos                 frameSize in sprite sheet
                                this.head = new Head(   [-30,-68],    [0,80],[60,80], this);
                                this.rArm = new RArm(   [-27,1],        [300,80],[60,80], this);
                                this.body = new Body(  [-13,-3],      [180,80],[60,80], this);
                                this.legs = new Legs(   [-22,23],      [360,80],[60,80], this);
                                this.lArm = new LArm(   [-40,1],      [240,80],[60,80], this);
    }
}

function randomFromZeroTo (N) {
    return Math.round(Math.random()*N);
}
