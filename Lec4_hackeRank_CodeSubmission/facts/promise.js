let fs = require("fs");


let pendingPromise = fs.promises.readFile("./f1.txt");

console.log(pendingPromise);

// resolve // fullfill // success
pendingPromise.then(function(data){
console.log("Content " + data);
});

// reject // failed 
pendingPromise.catch(function(error){
console.log(error);
});


console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");
console.log("hello");



    