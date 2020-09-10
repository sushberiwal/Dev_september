// in dev_sep folder
// npm init -y
// npm install cheerio => cheerio available with node
// require => module is available in the file 

let fs = require("fs");
let cheerio = require("cheerio");
let data = fs.readFileSync("./index.html" , "utf-8");


let ch = cheerio.load(data);
// classes => using . => styling
// ids => using # => javascript  

// let pTagKaData = ch("p").text();
let pTagKaData = ch(".pa.outer").text();
// console.log(pTagKaData);
let h1KaData = ch("#unique").text();
console.log(h1KaData);






