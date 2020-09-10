/// java => System.out.println("asjkdgajdsgjhasfd");
// main ? class ? public private static 
// top to down and left to right

// console.log("hello world !!");
// data types =? int , float , double , long 

// dynamic type language
// ES6 syntax

// Standards

// ES5 old => ES6 new
// variables => let , const

// file scope
// const => Redeclaration of varibale is not allowed
const pi = 3.14;

let a = 10;
// console.log(a);
// a=20;
// console.log(a);
// console.log(pi);
// 
// scope => let and const => block scoped 
if(a=10){
    let b = 20;
    if(true){
        // console.log(b);
    }
}

// JS datatypes => undefined , null , number , string , boolean , object

let abc= "asadfasfasdfas" ; // string
// console.log(abc);

//ES5 => ES6
function saysHi(name){
    // String Interpolation
    console.log( `${name} Says Hi !!!!` );
    // console.log(name + " Says Hi !!!!");
    return 10;
}


// console.log( saysHi("Steve") );

// functions are variables
let greeter =  function(){
     console.log("functions are variables");
     return 10;
};
console.log( greeter()  );











































