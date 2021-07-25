let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

function getAllMatches(link) {
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
    let allATags = ch('a[data-hover="Scorecard"]');
    //console.log(allATags.length);
    for(let i = 0; i < allATags.length; i++) {
        let link = ch(allATags[i]).attr("href");
        let completeLInk = "https://www.espncricinfo.com" + link;
        console.log(completeLInk);
    }
}

module.exports = getAllMatches;