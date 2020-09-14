let fs = require("fs");

console.log("Before");

let f1KaPromise = fs.promises.readFile("./f1.txt");
f1KaPromise.then(function (data) {
  console.log("Content of F1 " + data);
})
.then(function(){
 let f2KaPromise = fs.promises.readFile("./f2.txt");
 return f2KaPromise;
})
.then(function(data){
    console.log("Content of F2" + data);
})
.then(function(){
let f3KaPromise = fs.promises.readFile("./f3.txt");
return f3KaPromise;
})
.then(function(data){
 console.log("Content of F3 " + data);   
})
.catch(function (error) {
  console.log(error);
});


console.log("After");

