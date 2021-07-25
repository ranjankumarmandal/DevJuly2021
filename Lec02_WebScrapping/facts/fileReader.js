// fs module => file system
let fs = require("fs");
let cheerio = require("cheerio");    //npm install cheerio

// let f1Data = fs.readFileSync("./f1.txt", "utf-8");
// console.log(f1Data);

let htmlData = fs.readFileSync("./index.html");
//console.log(htmlData + "");

let ch = cheerio.load(htmlData);

let h1Data = ch("h1").text();   //<h1> Heading 1 </h1>
console.log(h1Data);

// let pData = ch("p")  // [ <p> paragraph 1 </p>, <p> paragraph 2 </p> ]
// console.log(firstP);

// access html tag data with thier classes and ids  ---->   ----->

// let pData = ch(".pa.outer").text();  //html data access with class
// console.log(pData);

let p2Data = ch("ul .pa").text();  //html data access with class
console.log(p2Data);


let h1Datawithid = ch("#unique").text(); //html data access with ids
console.log(h1Datawithid);
