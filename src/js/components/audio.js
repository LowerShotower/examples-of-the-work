import {forEach} from 'lodash-es';

let isVolume = 1;
var LibCanvasAudio = function (file) {
    this.audio = new Audio;
    this.audio.src = file;
    this.elem=this.audio;
};

LibCanvasAudio.prototype = {
    src : function (file) {
        var codec = this.getSupport();
        if (!codec) throw 'AudioNotSupported';
        this.audio.src = file.replace(/\*/g, this.getSupport());
        this.audio.load();
        return this;
    },
    getSupport : function () {
        return !this.audio.canPlayType ? false :
            this.audio.canPlayType('audio/ogg;')  ? 'ogg' :
            this.audio.canPlayType('audio/mpeg;') ? 'mp3' : false;
    },
    cloneAudio : function (src) {
        let audioClone = this.audio.cloneNode(true);
        audioClone.src = src;
        audioClone.load();
        return audioClone;
    },
    gatling : function (count, srcArr) {
        this.barrels = [];
        this.gatIndex =  0;
        while (count--) {
            this.barrels.push(this.cloneAudio(srcArr[count-1]||this.audio.src));
        }
        return this;
    },
    getNext : function () {
        this.elem = this.barrels[this.gatIndex];
        ++this.gatIndex >= this.barrels.length && (this.gatIndex = 0);
        return this.elem;
    },
    stopCurrent: function (){
        this.elem.pause();
    },
    playNext : function (loop) {
        this.elem.pause();
        this.elem = this.getNext(true);
        this.elem.currentTime = 0;
        this.elem.loop = loop || false;
        this.elem.play();
        return this;
    }
};

var fireSound = new LibCanvasAudio('audio/wosh3.wav').gatling(1,[]);
var waterSound = new LibCanvasAudio('audio/water2.wav').gatling(1,[]);
var earthSound = new LibCanvasAudio('audio/earth1.wav').gatling(1,[]);
var poisonSound = new LibCanvasAudio('audio/poison1.wav').gatling(1,[]);
var musicSound = new LibCanvasAudio('audio/soundtrack2.mp3').gatling(3,['audio/soundtrack5.mp3','audio/soundtrack4.mp3']);

function stopAllAudio(){
    let name =['fireSound','waterSound','earthSound','poisonSound','musicSound']
    for (let i = 0; i < 5; i++) {
             this[name[i]].audio.pause();
    }
}

function volumeOff(){
    let name =['fireSound','waterSound','earthSound','poisonSound','musicSound']
    for (let i = 0; i < name.length; i++) {
        
            forEach( this[name[i]].barrels, (e)=>{
                console.log(e.volume);
                e.volume = 0;
            });
    }
}

function volumeOn(){
    let name =['fireSound','waterSound','earthSound','poisonSound','musicSound']
    for (let i = 0; i < name.length; i++) {
        forEach( this[name[i]].barrels, (e)=>{
            console.log(e.volume);
            e.volume = 1;
        });
}
}

function toggleVolume(btn) {
    if (this.isVolume == 1) {
        btn.html('sound:off');
        this.volumeOff();
        this.isVolume = 0;
    } else {
        btn.html('sound:on');
        this.volumeOn();
        this.isVolume = 1;
    }
}

export let audio = {
    isVolume: 1,
    fireSound:fireSound,
    waterSound:waterSound,
    earthSound:earthSound,
    poisonSound:poisonSound,
    musicSound:musicSound,
    stopAllAudio: stopAllAudio,
    toggleVolume: toggleVolume,
    volumeOn: volumeOn,
    volumeOff: volumeOff,
}