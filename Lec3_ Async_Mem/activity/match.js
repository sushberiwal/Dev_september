let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

// let link = "https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019";

let lb = [];
let count=0;

function getMatch(link) {
  console.log("Sending Request" , count);
  count++;
  request(link, dataReceiver);
}

function dataReceiver(error, response, html) {
  if (error == null && response.statusCode == 200) {
    // successfully html received
    // console.log(html);
    console.log("received data!!" , count);
    parseData(html);
    count--;
    if(count==0){
      console.table(lb);
    }

  } else if (response.statusCode == 404) {
    console.log("Page not found !!!");
  } else {
    console.log(error);
  }
}

function parseData(html) {
  let ch = cheerio.load(html);
  let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible");
  let winningTeam = ch(".summary span").text().split("won")[0].trim();
  console.log(winningTeam);
  // fs.writeFileSync("./bothInnings.html" , bothInnings);
  for (let i = 0; i < bothInnings.length; i++) {
    let teamName = ch(bothInnings[i]).find(".header-title.label").text();
    teamName = teamName.split("Innings")[0].trim();
    // console.log(teamName);
   if(winningTeam == teamName){
     let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
     for (let j = 0; j < allTrs.length - 1; j++) {
       let allTds = ch(allTrs[j]).find("td");
       if (allTds.length > 1) {
         let batsmanName = ch(allTds[0]).find("a").text().trim();
         let runs = ch(allTds[2]).text().trim();
         let balls = ch(allTds[3]).text().trim();
         let fours = ch(allTds[5]).text().trim();
         let sixes = ch(allTds[6]).text().trim();
         let sr = ch(allTds[7]).text();
         // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} StrikeRate = ${sr}`);
         createLeaderBoard(teamName, batsmanName, runs, balls, fours, sixes);
       }
     }
   }
  }
}





function createLeaderBoard(teamName, batsmanName, runs, balls, fours, sixes){
  runs = Number(runs);
  balls = Number(balls);
  fours = Number(fours);
  sixes = Number(sixes);

  for(let i=0 ; i<lb.length ; i++){
    if(lb[i].BatsmanName == batsmanName && lb[i].Team == teamName){
      lb[i].Runs += runs;
      lb[i].Balls += balls;
      lb[i].Fours += fours,
      lb[i].Sixes += sixes
      return; 
    }
  }

  let entry = {
    Team : teamName,
    BatsmanName : batsmanName,
    Runs : runs,
    Balls : balls,
    Fours : fours,
    Sixes : sixes,
  }
  lb.push(entry);
}
module.exports.getMatch = getMatch;
