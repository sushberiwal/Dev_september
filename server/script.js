

let btn = document.querySelector(".btn");


btn.addEventListener("click" , function(){
    console.log("btn clicked");
    axios.get("/home").then(function(res){
        console.log(res);
    })
})