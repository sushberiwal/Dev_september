// in dev_sep folder
// npm init -y
// npm install cheerio => cheerio available with node
// require => module is available in the file 

let fs = require("fs");
let cheerio = require("cheerio");


let data = fs.readFileSync("./index.html" , "utf-8");

let ch = cheerio.load(data);

let pTagKaData = ch("p").text();

console.log(pTagKaData);







