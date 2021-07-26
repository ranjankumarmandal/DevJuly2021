//Find the details of a single match

let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

//let link = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/england-vs-new-zealand-final-1144530/full-scorecard";

function getMatch(link) {
    request(link, cb);
}

function cb(error, response, html) {
    if(error == null && response.statusCode == 200) {
        parseData(html);
    } else if(response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(error);
    }
}

function parseData(html) {
    let ch = cheerio.load(html);
    let bothInnings = ch(".card.content-block.match-scorecard-table .Collapsible"); //[<div> </div>, <div> </div>] => 2 divTags
    //console.log(bothInnings.length);
    for(let i = 0; i < bothInnings.length; i++) {
        let teamName = ch(bothInnings[i]).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        //console.log(teamName);

        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");  //[<tr> </tr>, <tr> </tr>, <tr> </tr>, <tr> </tr>]
        //console.log(allTrs.length);
        for(let j = 0; j < allTrs.length - 1; j++) {
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1) {                                       //because some <tr> are invalid, which contains only 1 <td>, and we are going to execute the valid <tr>
                let batsmanName = ch(allTds[0]).find("a").text().trim();
                let run = ch(allTds[2]).text().trim();
                let ball = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                let strickRate = ch(allTds[7]).text().trim();
                //console.log(run);
                //String interpolation
                // console.log(`Batsman = ${batsmanName} Runs = ${run} Balls = ${ball} Fours = ${fours} Sixes = ${sixes} StrickRate = ${strickRate}`);
                processDetails(teamName, batsmanName, run, ball, fours, sixes, strickRate);
            }
        }
    }

    console.log("####################################################################");
}

function processDetails(teamName, batsmanName, run, ball, fours, sixes, strickRate) {
    //check if folder exists
    let isTeamFolder = checkTeamFolder(teamName);
    if(isTeamFolder) {
        let isBatsman = checkBatsmanFile(teamName, batsmanName);
        if(isBatsman) {
            updateBatsmanFile(teamName, batsmanName, run, ball, fours, sixes, strickRate);
        } else {
            createBatsmanName(teamName, batsmanName, run, ball, fours, sixes, strickRate);
        }
    } else {
        createTeamFolder(teamName);
        createBatsmanName(teamName, batsmanName, run, ball, fours, sixes, strickRate);
    }
}

function checkTeamFolder(teamName) {
    //check team folder exists or not
    return fs.existsSync(teamName);
}

function createTeamFolder(teamName) {
    //teamName = India
    fs.mkdirSync(teamName);
}

function checkBatsmanFile(teamName, batsmanName) {
    //teamName = India
    //batsmanName = MSDhoni
    //batsmanPath = India/MSDhoni.json   //JavaScript object notation
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function createBatsmanName(teamName, batsmanName, run, ball, fours, sixes, strickRate) {
    let batsmanPath = `${teamName}/${batsmanName}.json`;

    let batsmanFile = [];
    let innings = {
        Runs : run,
        Balls : ball,
        Four : fours,
        Six : sixes,
        SR : strickRate
    };

    batsmanFile.push(innings);
    batsmanFile = JSON.stringify(batsmanFile);

    fs.writeFileSync(batsmanPath, batsmanFile);
}

function updateBatsmanFile(teamName, batsmanName, run, ball, fours, sixes, strickRate) {
    let batsmanPath = `${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    //stringify => original form
    batsmanFile = JSON.parse(batsmanFile);

    let innings = {
        Runs : run,
        Balls : ball,
        Four : fours,
        Six : sixes,
        SR : strickRate
    };

    batsmanFile.push(innings);
    batsmanFile = JSON.stringify(batsmanFile);

    fs.writeFileSync(batsmanPath, batsmanFile);
}

module.exports = getMatch;