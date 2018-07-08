var s;
var Renderer = {
        settings: {
        },
        init: function(){
            s = this.settings;
            
        },
        createTerrain: function(imgUrls,isRepeat) {
            console.log(Math.round(Math.random()*(imgUrls.length-1)));
            s.background = s.ctx.createPattern(resources.get(imgUrls[Math.round(Math.random()*(imgUrls.length-1))]), isRepeat);
        },

        renderEntities: function(list,dt) {
            for(let i=0; i<list.length; i++) {
                Renderer.renderEntity(list[i],dt);
            }
        },
        renderEntity: function(entity, dt) {
            if(entity.sprite != null){   
                s.ctx.save();
                s.ctx.translate(entity.pos[0], entity.pos[1]);
                entity.sprite.render(s.ctx,dt);
                s.ctx.restore();
            }
        },
        // Draw everything
        renderAll: function(state, entities, dt) {
            s.ctx.fillStyle = s.background;
            s.ctx.fillRect(0, 0, s.canvas.width, s.canvas.height);

            // Render the player if the game isn't over
                this.renderEntities(entities, dt);
        }
}

window.Renderer = Renderer;