// async // read multiple files // serially
//Serial async takes more time to execute, as other callback function waits to execute for previous ones

let fs = require("fs");

console.log("Befor");

fs.readFile("./f1.txt", function cb(error, data) {
    console.log("content " + data);
    fs.readFile("./f2.txt", function cb(error, data) {
        console.log("content " + data);
        fs.readFile("./f3.txt", function cb(error, data) {
            console.log("content " + data);
        });
        
    });
});

console.log("After");