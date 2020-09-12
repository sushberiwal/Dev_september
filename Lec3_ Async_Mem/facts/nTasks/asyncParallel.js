let fs = require("fs");
let files = ["../f1.txt" , "../f2.txt" , "../f3.txt" ];


//iterative code
for(let i=0 ; i<files.length ; i++){
    fs.readFile( files[i]  , function(err,data){
        console.log("Content = " + data);
    });
}

let idx=0;
while(idx<files.length){
    fs.readFile( files[idx]  , function(err,data){
        console.log("Content = " + data);
    })
    idx++;
}

//Recursive code
function fileReader(idx){
    if(idx== files.length){
        return;
    }
    fs.readFile(files[idx] , function(err,data){
        console.log("Content = " + data);
    })
    fileReader(idx+1);
}

fileReader(0);