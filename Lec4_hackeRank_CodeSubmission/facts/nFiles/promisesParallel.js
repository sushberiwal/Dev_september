let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

// async task => promises => parallely

for(let i=0 ; i<files.length ; i++){
    let pp = fs.promises.readFile(files[i]);
    pp.then(function(data){
        console.log("Content " + data);
    })
    pp.catch(function(err){
        console.log(err);
    })
}

