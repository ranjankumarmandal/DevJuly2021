// async tasks : given 3 files, parallely read files
//Parallel Async code - This is a async code, here callback functions are executed randomly, most probably according to the size

let fs = require("fs");

console.log("Before");

fs.readFile("./f1.txt", function cb(error, data) {
    console.log("content " + data);
});

fs.readFile("./f2.txt", function cb(error, data) {
    console.log("content " + data);
});

fs.readFile("./f3.txt", function cb(error, data) {
    console.log("content " + data);
});

console.log("After");
