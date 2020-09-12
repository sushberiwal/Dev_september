let fs = require("fs");

console.log("Before");

fs.readFile("./f1.txt" , cb);
function cb(err , data){
    console.log("Content of F1 = "+ data);
}

console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");
console.log("after");

while(true){
    // infinite loop => stack will be blocked and callback will not execute
}

