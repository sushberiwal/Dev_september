let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");

// let link = "https://www.espncricinfo.com/series/8039/scorecard/1144529/england-vs-australia-2nd-semi-final-icc-cricket-world-cup-2019";

function getMatch(link) {
  request(link, dataReceiver);
}

function dataReceiver(error, response, html) {
  if (error == null && response.statusCode == 200) {
    // successfully html received
    // console.log(html);
    parseData(html);
  } else if (response.statusCode == 404) {
    console.log("Page not found !!!");
  } else {
    console.log(error);
  }
}

function parseData(html) {
  let ch = cheerio.load(html);
  let bothInnings = ch(
    ".card.content-block.match-scorecard-table .Collapsible"
  );
  // fs.writeFileSync("./bothInnings.html" , bothInnings);
  for (let i = 0; i < bothInnings.length; i++) {
    let teamName = ch(bothInnings[i]).find(".header-title.label").text();
    teamName = teamName.split("Innings")[0].trim();
    console.log(teamName);

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
        processDetails(teamName, batsmanName, runs, balls, fours, sixes, sr);
      }
    }
    console.log("######################################");
  }
}

function checkTeamFolder(teamName){
// teamName = India
    return fs.existsSync(teamName);
}
function checkBatsmanFile(teamName , batsmanName){
    // batsmanfile => India/MSDHoni.json
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}
function updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr){
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    // read json file
    let data = fs.readFileSync(batsmanPath);    
    data = JSON.parse(data);
    // add new entry 
    let entry = {
        Runs : runs,
        Balls : balls,
        Fours : fours , 
        Sixes : sixes,
        SR : sr
    }
    data.push(entry);
    data = JSON.stringify(data);
    // write new json file
    fs.writeFileSync(batsmanPath , data);
}
function createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr){
    // India/MSDHoni.json
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let data = [];
    let entry = {
        Runs : runs,
        Balls : balls,
        Fours : fours , 
        Sixes : sixes,
        SR : sr
    }
    data.push(entry);
    data = JSON.stringify(data);
    fs.writeFileSync(batsmanPath , data);
}
function createTeamFolder(teamName){
    fs.mkdirSync(teamName);
}



function processDetails(teamName, batsmanName, runs, balls, fours, sixes, sr) {
    let isTeam = checkTeamFolder(teamName);
    //isTeam = true => team folder exists
    if(isTeam){
        let isBatsman = checkBatsmanFile(teamName , batsmanName);
        if(isBatsman){
            updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr);
        }
        else{
            createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr);
        }
    }
    // isTeam = false => team folder dont exist
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, sr);
    }

}

module.exports.getMatch = getMatch;
