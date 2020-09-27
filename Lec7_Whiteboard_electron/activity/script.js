let canvas = document.querySelector("#canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})


// 2d drawing api = Context
let ctx = canvas.getContext('2d');
// x , y , width , height
ctx.fillStyle = "black";
// ctx.fillRect(10, 10, 100, 100);

// ctx.beginPath();

// ctx.moveTo(10,10);
// ctx.lineTo(50,10);
// ctx.lineTo(50,50);
// ctx.lineTo(10,50);
// ctx.lineTo(10,10);
// ctx.stroke();


let isPenDown = false;

canvas.addEventListener("mousedown" , function(e){
    isPenDown = true;
    let {top , left} = canvas.getBoundingClientRect();
    let x = e.clientX-left;
    let y = e.clientY-top;
    ctx.beginPath();
    ctx.moveTo(x,y);
})

canvas.addEventListener("mousemove" , function(e){
    if(isPenDown){
        let {top , left} = canvas.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY- top;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
})

canvas.addEventListener("mouseup" , function(e){
    isPenDown = false;
})
