//functions

//function body
function sayHi(name) {
    console.log(name + " saysHi");
    return 10;
}

//fundtion call
console.log(sayHi("Steve"));

//output will be 'sayHi is a function'
console.log(sayHi);

//functions are variables
let fun = function() {
    console.log("fun says Hi");
}
fun();

//variables can be passed as parameter
//functions can also be passed as a parameter
function mainFuntion(fun1) {
    console.log("mainFunction says hi");
    fun1();
}

function secondFunction() {
    console.log("secondFuntion says hi");
}

mainFuntion(secondFunction);