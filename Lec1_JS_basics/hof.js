//high order fundtions (hof) => functions which take function as an argument
function fun(name, saysHi) {
    let a = saysHi(name);
    console.log(a + "says hi");
}

//callback function => functions which are passed as an argument to another functions
function getfirstName(name) {
    name = name.split(" ");
    return name[0];
}

function getlastName(name) {
    name = name.split(" ");
    return name[1];
}

//call the hof by passnig argument as functions (or callback functions)
fun("Steve Rogers", getfirstName);
fun("Steve Rogers", getlastName);