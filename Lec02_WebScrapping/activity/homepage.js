//npm install request
let request = require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

let link = "https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415";
request(link, cb);                              // high order function (hof) from module 'request'

function cb(error, response, html) {            // callback function (cb)
    if(error == null && response.statusCode == 200) {       ////In response parameter all the network, status code, etc related information are stored, which we will not user, they are like garbase for us currently
        parseData(html);
    } else if(response.statusCode == 404) {
        console.log("Page not found");
    } else {
        console.log(error);
    }    
}

function parseData(html) {
    let ch = cheerio.load(html);
    let aTag = ch(".widget-items.cta-link a").attr("href");
    let completeLink = "https://www.espncricinfo.com" + aTag;
    //console.log(completeLink);
    getAllMatches(completeLink);
}

//Here we found the link of all cricket matches