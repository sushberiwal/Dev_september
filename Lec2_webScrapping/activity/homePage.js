// npm install request
// sudo npm install request

let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
// object destructuring
const { getAllMatches } = require("./allMatches");


let link = "https://www.espncricinfo.com/series/_/id/8039/season/2019/icc-cricket-world-cup";

// => function => address 
request( link , dataReceiver );

// succesfully data aa jaega => error => null , response.stausCode==200 and html = data
// link is not valid => error  , response.statusCode == 404 and html = null

//callback function
function dataReceiver(error , response , html){
    if(error == null && response.statusCode==200){
        // successfully html received
        // console.log(html);
        parseData(html);
    }
    else if(response.statusCode == 404){
        console.log("Page not found !!!")
    }
    else{
        console.log(error);
    }
}

function parseData(html){
    // fs.writeFileSync("./match.html" , html);
    let ch = cheerio.load(html);
    let link = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com"+link;
    getAllMatches(completeLink);
}
