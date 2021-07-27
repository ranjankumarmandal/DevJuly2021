//Find the details of a single match

let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

let leaderboard = [];

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
                createLeaderBoard(teamName, batsmanName, run, ball, fours, sixes);
            }
        }
    }

    console.log("####################################################################");
}

function createLeaderBoard(teamName, batsmanName, run, ball, fours, Sixes) {
    run = Number(run);
    ball = Number(ball);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i = 0; i < leaderboard.length; i++) {
        if(leaderboard[i].Team == teamName && leaderboard[i].Batsman == batsmanName) {
            leaderboard[i].Runs += run;
            leaderboard[i].Balls += ball;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }

    let entry = {
        Team : teamName,
        Batsman : batsmanName,
        Runs : run,
        Balls : ball,
        Fours : fours,
        Sixes : sixes
    };

    leaderboard.push(entry);
}

module.exports = getMatch;