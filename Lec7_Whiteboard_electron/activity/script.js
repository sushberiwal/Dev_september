let canvas = document.querySelector("#canvas");
let points = [];
let redoPoints = [];

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


window.addEventListener("resize" , function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    reDraw();
})


// 2d drawing api = Context
let ctx = canvas.getContext('2d');
// x , y , width , height
ctx.fillStyle = "black";
ctx.lineCap = 'round';
ctx.miterLimit = 1;
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

    let point = {
        id : "md",
        x : x,
        y : y,
        color : ctx.strokeStyle,
        width : ctx.lineWidth
    }
    points.push(point);
    socket.emit("md" , point);
})

canvas.addEventListener("mousemove" , function(e){
    if(isPenDown){
        redoPoints = [];
        let {top , left} = canvas.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY- top;
        ctx.lineTo(x,y);
        ctx.stroke();
        let point = {
            id : "mm",
            x : x,
            y : y,
            color : ctx.strokeStyle,
            width : ctx.lineWidth
        }
        points.push(point);
        socket.emit("mm" , point);
    }
})

canvas.addEventListener("mouseup" , function(e){
    isPenDown = false;
    // console.log(points);
})
