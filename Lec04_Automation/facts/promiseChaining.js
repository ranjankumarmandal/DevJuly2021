//async // promise // prallely
let fs = require("fs");

let f1Promise = fs.promises.readFile("f1.txt");

f1Promise.then(function(data) {
    console.log("content " + data);
})
.then(function() {
    let f2Promise = fs.promises.readFile("f2.txt");
    return f2Promise;
})
.then(function(data) {
    console.log("content " + data);
})
.then(function() {
    f3Promise = fs.promises.readFile("f3.txt");
    return f3Promise;
})
.then(function(data) {
    console.log("content " + data);
});
