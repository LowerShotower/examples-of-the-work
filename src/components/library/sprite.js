(function() {
    function Sprite(url, pos, size, speed, frames, dir, once) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this.currFrame = 0;
        this.index = 0;
        this.done = false;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
    };

    Sprite.prototype = {

        render: function(ctx,dt) {
            if (this.frames.length != 0){
                var max = this.frames.length;
                if( this.frames[0] != -1 && this.done == false) {
                    this.index += this.speed*dt;
                    var idx = Math.floor(this.index);
                    this.currFrame = this.frames[idx % max];
                    if(this.once && idx >= max-1) {
                        this.done = true;
                    }
                }
            } else {
                this.currFrame = 20;
            }


            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += this.currFrame * this.size[1];
            }
            else {
                x += this.currFrame * this.size[0];
            }

            ctx.drawImage(resources.get(this.url),
                          x, y,
                          this.size[0], this.size[1],
                          0, 0,
                          this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();