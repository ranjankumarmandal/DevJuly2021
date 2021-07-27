let fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt"];

// async // parallely file read => with for loops

for(let i = 0; i < files.length; i++) {
    fs.readFile(files[i], function cb(error, data) {
        console.log("content " + data);
    });
}

