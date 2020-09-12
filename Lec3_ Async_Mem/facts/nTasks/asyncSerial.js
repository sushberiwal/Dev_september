// Async tasks and Serially
let fs = require("fs");
let files = ["../f1.txt", "../f2.txt", "../f3.txt"];

// recursive code
function fileReader(idx) {
  if (idx == files.length) {
    return;
  }
  fs.readFile(files[idx], function (err, data) {
    console.log("Content " + data);
    fileReader(idx + 1);
  });
}

fileReader(0);
