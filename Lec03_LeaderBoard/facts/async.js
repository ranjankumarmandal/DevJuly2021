let fs = require("fs");

// Async code => this is used when something will take too long time to execute, but below code are also more important, then we use this. Here this callback function is sent to Node API, and then to waiting queue, once RAM stack becomes empty, this got loaded to RAM, like in youtube : whole video loads, but before that whole youtube website loades but parallely that video content also loades and get executed once youtube webpage loads completely. This saves time a lot, and makes websites more efficient and scalable.

console.log("Before");

fs.readFile("./f1.txt", cb);  // this is async code of fs module to read file, here this start reading files

function cb(error, data) {
    console.log("content " + data);
}


console.log("After");

// here prints the read file