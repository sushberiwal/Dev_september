let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const { getMatch } = require("./match");


function getAllMatches(link){
    request(link , dataReceiver );
}
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
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');
    for(let i=0 ; i<allATags.length ; i++){
        let link = ch(allATags[i]).attr("href");
        let completeLink = "https://www.espncricinfo.com"+link;
        getMatch(completeLink);
    }
}
// module.exports = getAllMatches;
module.exports.getAllMatches = getAllMatches;


