let fs = require("fs");

//blocking code
// Serial Code

// Javascript => Async
// Javascript => By default js is sync language , async => callbacks

// Async tasks => Network/ Request/ Response

console.log("Before");

// Stack block
let content = fs.readFileSync("./f1.txt" , "utf-8");   // => 100gb
console.log(content);

console.log("after");
console.log("After");
console.log("after");
console.log("After");
console.log("after");
console.log("After");
console.log("after");
console.log("After");
console.log("after");
console.log("After");
console.log("after");
console.log("After");
console.log("after");
console.log("After");
console.log("after");
console.log("After");
