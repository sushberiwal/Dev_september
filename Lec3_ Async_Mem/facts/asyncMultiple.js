let fs = require("fs");

// Async Task
// mulitple files => Parallely

console.log("Before");

fs.readFile("./f1.txt", function (err, data) {
  console.log("Content of F1 = " + data);
  fs.readFile("./f2.txt", function (err, data) {
    console.log("Content of F2= " + data);
    fs.readFile("./f3.txt", function (err, data) {
      console.log("Content of F3= " + data);
    });
  });
});

console.log("after");
