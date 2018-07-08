import Entity from './entity';
import { Body, Head, LArm, RArm, Legs } from './bodyParticle';
import {find} from 'lodash-es';

export default class Humanoid extends Entity {
    constructor (pos,N) {
        super();
            this.pos = pos||[160,320];
            this.N=0;
            this.h = Frames.humanoids;
                                //  ajustment      framePos frameSize in sprite sheet
                                this.head = new Head( [-30,-73], this.h.idle.head[this.N].sp,this.h.idle.head[this.N].frsize, this);
                                this.lArm = new LArm( [-40,1], this.h.idle.lArm[this.N].sp,this.h.idle.lArm[this.N].frsize, this);
                                this.body = new Body( [-13,-3], this.h.idle.body[this.N].sp,this.h.idle.body[this.N].frsize, this);
                                this.legs = new Legs( [-20,24], this.h.idle.legs[this.N].sp,this.h.idle.legs[this.N].frsize, this);
                                this.rArm = new RArm( [-20,1], this.h.idle.rArm[this.N].sp,this.h.idle.rArm[this.N].frsize, this);
    }
}