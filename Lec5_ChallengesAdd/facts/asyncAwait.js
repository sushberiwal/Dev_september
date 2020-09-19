let fs = require("fs");

// IIFE => immediately invoked function expressions
// async await => async function

console.log("before");

(async function init(){
    
    try{
        let data = await fs.promises.readFile("./f1.txt");
        console.log("Content "+data);        
    }
    
    catch(err){
        console.log(err);
    }
})();




console.log("after");

