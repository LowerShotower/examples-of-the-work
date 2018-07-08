var Vector = {
    vectToDist: function(vector) {
        return Math.sqrt(  Math.pow(vector[0],2)
                          +Math.pow(vector[1],2)  );
    },
    distToVect: function(dist,dir) {
        let norm = this.getNormalVect(dir);
        return [norm[0]*dist, norm[1]*dist];
    },
    normal: function(vector) {
        let modal = this.vectToDist(vector);
        return [vector[0]/modal,vector[1]/modal];
    },
    multiply (vector,m) {

        return [vector[0]*m,vector[1]*m];
    },
    sum(...args){
        let tArr=[0,0];
        for (let i = 0; i < args.length; i++) {
            tArr[0]+=args[i][0];
            tArr[1]+=args[i][1];
        }
        return tArr;
    },

    reverse (vector){
        vector[0] = -vector[0];
        vector[1] = -vector[1];
        return vector;
    }
}

window.Vector = Vector;