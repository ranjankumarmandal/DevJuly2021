let fs = require("fs");

// sync code => top to bottom and left to right

console.log("Before");
let f1Data = fs.readFileSync("./f1.txt");    // this is sync code of fs module to read file
console.log("Content " + f1Data);


console.log("After");