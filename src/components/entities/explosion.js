import Entity from './entity';

 class Explosion extends Entity {
    constructor(pos,explIndex){
            super();
            this.pos = pos||[440,340];
            this.name = 'explosion';
            this.N = explIndex;
            this.e = Frames.explosions;
            this.savePos (this);                                        // url, pos, size, speed, frames, dir, once
            this.sprite =  new Sprite('img/explosions.png', this.e.idle[this.N].sp, 
                                                            this.e.idle[this.N].frsize, 
                                                            this.e.idle[this.N].speed, 
                                                            this.e.idle[this.N].frs,
                                                            null,true);
            this.idleAnim = new Animation('idle',this.getIdleSprites());
            this.explodeAnim = new Animation('explode',this.getExplodeSprites());
            this.animator = new Animator([this.idleAnim,this.explodeAnim], 'idle', this.name);
       }
       getIdleSprites(){
            // this.head, tempProgress,  max, direction, time, repStyle
        let name = 'idle',st = 'bounce',names = ['explosions'],coeff = 0.2;
        let explosion = this.e[name][this.N];
        return [[this, 0, 1 , [-1,1], explosion.speed*coeff, st, 1,  [  explosion.sp, explosion.frs, explosion.speed, explosion.once]  ],
                ];
    }

    getExplodeSprites(){
        // this.head, tempProgress,  max, direction, time, repStyle
       let name = 'explode',st = 'bounce',names = ['explosions'],coeff = 0.2;
       let explosion = this.e[name][this.N];
       return [[this, 0, 1 , [-1,1], explosion.speed*coeff, st, 1,  [  explosion.sp, explosion.frs, explosion.speed, explosion.once]  ],
               ];
     }

     update(e,dt){
         
        //  if(input.isDown('space')){
        //     this.animator.setAnimation('explode',true);
        // }
     }

     explode(){
        this.animator.setAnimation('explode',true);
    }
    
    changeStyleTo(N){
        this.N = N;
        this.explodeAnim = new Animation('explode',this.getExplodeSprites());
        this.animator = new Animator([this.idleAnim,this.explodeAnim], 'idle', this.name);
    }
}

export {Explosion} 