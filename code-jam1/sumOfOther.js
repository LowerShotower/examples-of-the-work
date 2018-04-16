
function sumOfOther (arr) {
     let res = [], sum = 0;

     for (let l = 0; l < arr.length; l++) {
          sum += arr[l];
     }

     res = arr.map(function (item) {
          return sum - item;
     });
     return res;
}

console.log(sumOfOther([2, 3, 4, 1]));