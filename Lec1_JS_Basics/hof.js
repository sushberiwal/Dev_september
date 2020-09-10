// High Order Functions => Functions which takes functions as an argument
// CallBack Functions => Functions which are passed as an argument to a function


function getFirstName(fullName){
    // "Steve Rogers"
    let fname = fullName.split(" ")[0];
    // [ "Steve" , "Rogers" ];
    return fname;
}


function getLastName(fullName){
    //return last name
    let lname = fullName.split(" ")[1];
    return lname;
}


function greeter(fullName , callback){
    let name = callback(fullName);
    console.log(name);
}


greeter("Steve Rogers" , getFirstName);
greeter("Tony Stark" , getLastName);


