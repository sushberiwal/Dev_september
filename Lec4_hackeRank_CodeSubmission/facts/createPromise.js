let fs = require("fs");

function fileReader(fPath){
    return new Promise( function(resolve , reject){
       if(fPath == true){
           resolve("abjshdbasbdjhabsjdbajsdbjhasbdjabnsdhbads");
       }else{
           reject("ajksdnjkasndkjansdjknasjkdnajksdnjkasndjkabbsjdknbahsd");
       }
    });
}

let pendingPromise = fileReader(true);
pendingPromise.then(function(data){
console.log("Content " + data);
})

pendingPromise.catch(function(err){
console.log(err);
})

