import {find} from 'lodash-es';
var Frames = {
    explosions: {
            //sprPos    frames
            'explode':[
                {sp:[0,0],frs:[0,1,2,3,4,5,6,7,8],frsize:[60,80],speed:10, once:true},
                {sp:[0,80],frs:[0,1,2,3,4,5,6],frsize:[60,80],speed:10, once:true},
                {sp:[0,160],frs:[0,1,2,3,4,5,6,7,8],frsize:[60,80],speed:10, once:true},
                {sp:[0,240],frs:[0,1,2,3,4,5,6,7,8,9],frsize:[60,80],speed:10, once:true},
            ],
            'idle':[
                {sp:[0,0],frs:[],frsize:[60,80],speed:13, once:true},
                {sp:[0,80],frs:[],frsize:[60,80],speed:13, once:true},
                {sp:[0,160],frs:[],frsize:[60,80],speed:13, once:true},
                {sp:[0,240],frs:[],frsize:[60,80],speed:13, once:true},
            ]
        
        },
    monsters: {
        'idle':{
            head: [
                {sp:[0,0],frs:[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],frsize:[60,80],speed:8},
                {sp:[0,80],frs:[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],frsize:[60,80],speed:8},
                {sp:[0,160],frs:[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],frsize:[60,80],speed:8},
            ],
            body:[
                 {sp:[180,0],frs:[0],frsize:[60,80],speed:8},
                 {sp:[180,80],frs:[0],frsize:[60,80],speed:8},
                 {sp:[180,160],frs:[0],frsize:[60,80],speed:8},
            ],
            lArm:[
                 {sp:[240,0],frs:[0],frsize:[60,80],speed:8},
                 {sp:[240,80],frs:[0],frsize:[60,80],speed:8},
                 {sp:[240,160],frs:[0],frsize:[60,80],speed:8 },
            ],
            rArm:[
                 {sp:[300,0],frs:[0],frsize:[60,80],speed:8},
                 {sp:[300,80],frs:[0],frsize:[60,80],speed:8},
                 {sp:[300,160],frs:[0],frsize:[60,80],speed:8},
            ],
            legs: [
                 {sp:[360,0],frs:[0],frsize:[60,80],speed:8},
                 {sp:[360,80],frs:[0],frsize:[60,80],speed:8},
                 {sp:[360,160],frs:[0],frsize:[60,80],speed:8},
            ]
        },
        'attack':{
            head: [
                {sp:[0,0],frs:[0,0,1,1,0,0,0],frsize:[60,80],speed:8,once:true},
                {sp:[0,80],frs:[0,0,1,0,0,0,0],frsize:[60,80],speed:8,once:true},
                {sp:[0,160],frs:[0,0,1,1,0,0,0],frsize:[60,80],speed:8,once:true},
            ],
            body:[
                 {sp:[180,0],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[180,80],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[180,160],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            lArm:[
                 {sp:[240,0],frs:[0,0,3,3,5,5,3,3,0],frsize:[60,80],speed:8,once:true},
                 {sp:[240,80],frs:[0,0,3,3,5,5,3,3,0],frsize:[60,80],speed:8,once:true},
                 {sp:[240,160],frs:[0,0,3,3,5,5,3,3,0],frsize:[60,80],speed:8,once:true},
            ],
            rArm:[
                 {sp:[300,0],frs:[0,0,3,3,5,5,3,3,5,5,3,3,0],frsize:[60,80],speed:8,once:true},
                 {sp:[300,80],frs:[0,0,3,3,5,5,3,3,5,3,3,0],frsize:[60,80],speed:8,once:true},
                 {sp:[300,160],frs:[0,0,3,3,5,5,3,3,5,3,0],frsize:[60,80],speed:8,once:true},
            ],
            legs: [
                 {sp:[360,0],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[360,80],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[360,160],frs:[0],frsize:[60,80],speed:8,once:true},
            ]
        },
        'attacked':{
            head: [
                {sp:[0,0],frs:[2,2,2,2,2,2],frsize:[60,80],speed:5,once:true},
                {sp:[0,80],frs:[0,2,2,2,2,0],frsize:[60,80],speed:5,once:true},
                {sp:[0,160],frs:[0,2,2,2,2,0],frsize:[60,80],speed:5,once:true},
            ],
            body:[
                 {sp:[180,0],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[180,80],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[180,160],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            lArm:[
                 {sp:[240,0],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[240,80],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[240,160],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            rArm:[
                 {sp:[300,0],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[300,80],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[300,160],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            legs: [
                 {sp:[360,0],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[360,80],frs:[0],frsize:[60,80],speed:8,once:true},
                 {sp:[360,160],frs:[0],frsize:[60,80],speed:8,once:true},
            ]
        }
    },
    humanoids: {
        'idle':{
            head: [
                {sp:[0,240],frs:[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],frsize:[60,80],speed:8},
            ],
            body:[
                 {sp:[180,240],frs:[0],frsize:[60,80],speed:8},
            ],
            lArm:[
                 {sp:[240,240],frs:[0],frsize:[60,80],speed:8},
            ],
            rArm:[
                 {sp:[300,240],frs:[0],frsize:[60,80],speed:8},
            ],
            legs: [
                 {sp:[360,240],frs:[0],frsize:[60,80],speed:8},
            ]
        },
        'attack':{
            head: [
                {sp:[0,240],frs:[0,0,1,0,0,0,0,0,0,1],frsize:[60,80],speed:11, once:true },
            ],
            body:[
                 {sp:[180,240],frs:[0],frsize:[60,80],speed:11,once:true},
            ],
            lArm:[
                 {sp:[240,240],frs:[0,3,3,5,5,3,3,5,5,3,5,3,3,0],frsize:[60,80],speed:11,once:true},
            ],
            rArm:[
                 {sp:[300,240],frs:[0,3,3,5,5,3,3,5,5,3,3,3,0],frsize:[60,80],speed:11,once:true},
            ],
            legs: [
                 {sp:[360,240],frs:[0],frsize:[60,80],speed:11,once:true},
            ]
        },
        'attacked':{
            head: [
                {sp:[0,240],frs:[0,2,2,2,2,0],frsize:[60,80],speed:8, once:true },
            ],
            body:[
                 {sp:[180,240],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            lArm:[
                 {sp:[240,240],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            rArm:[
                 {sp:[300,240],frs:[0],frsize:[60,80],speed:8,once:true},
            ],
            legs: [
                 {sp:[360,240],frs:[0],frsize:[60,80],speed:8,once:true},
            ]
        }
    },
}

window.Frames = Frames;