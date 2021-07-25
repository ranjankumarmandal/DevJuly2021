//c++, java => entry point to execute
//JavaScript => top to down, left to right

//System.out.println("Hello World !");
//cout<< <<...
console.log("Hello World !");

//data types in javascript => Number, bolean, undefined, null, string, object

//int a = 6, char = 'a';
//E6 syntax => let, const

//let => block scoped variable => re-initialization allowed
let i;  //by default value will be 'undefined'

let a  = 12;
a = "wow";

let b = 32.43;
let c = "Hello";
let d = 'hello';
let e = true;
//array
let f = [1, 2, [11, 22, 33, 44], 4, "hello", 23.2];

console.log(a, b, c, d, e);
console.log(f);

//objects => key, value
let obj = {
    id : "1", 
    name : "Ranjan",
    movies : ["winter soldier", "Iron Man", "End Game"]
}

console.log(obj);
//dot notation => leterally match key
console.log(obj.id);

//bracket notation
key = "id";
console.log(obj[key]);

//const => block scoped variable => constant => re-initialization not allowed
//const => declaration and intialization at the same time
const pi = 3.14;
console.log(pi);

//== & ===
// 15 == "15" => true         here checks only for value
// 15 === "15" => false       here checks value and data types both