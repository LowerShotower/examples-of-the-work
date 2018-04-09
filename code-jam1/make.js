function make(...arr) {
     var tempArr = [];
     tempArr.push(arr[0]);
     var summ = 0;
     function tempF(...nextArr) {
          if (typeof(nextArr[0]) != "function") {
               for (let i = 0; i < nextArr.length; i++) {
                    tempArr.push(nextArr[i]);
                 }
               return tempF;
          } else {
               for (let i = 0; i < tempArr.length; i++) {
                    summ = nextArr[0](summ,tempArr[i]);
               }
               return summ;
          }
        }

     tempF.toString = function() {
     return summ;
     };

     return tempF;
}

function sum(a, b) {
     return a + b;
 }
 
console.log(make(15)(34, 21, 666)(41)(sum));

