let fs = require("fs");

console.log("Before");
let filePromise = fs.promises.readFile("../f1.txt");

console.log(filePromise);

let thenKaPromise = filePromise.then(scb);
filePromise.catch(fcb);

thenKaPromise.then(scb2);

function scb2(data){
    console.log("Inside then promise !!");
    console.log(data);
}

function scb(data){
    console.log("Content of F1 "+ data);
    return 10;
}
function fcb(err){
    console.log(err);
}


// setTimeout(  function(){console.log(filePromise)}    ,  8);

console.log("After");