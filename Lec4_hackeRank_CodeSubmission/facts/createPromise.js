let fs = require("fs");

function fileReader(fPath){
    let pendingPromise = new Promise( function(resolve , reject){
        fs.readFile( fPath , cb );
        function cb(err , data){
            if(err == null){
                resolve(data);
            }
            else{
                reject(err);
            }
        }
    });
    return pendingPromise;
}





let pendingPromise = fileReader("./f1.txt");


pendingPromise.then(function(data){
console.log("Content " + data);
})

pendingPromise.catch(function(err){
console.log(err);
})