let canvas = document.querySelector("#canvas");


// 2d drawing api = Context
let ctx = canvas.getContext('2d');

// x , y , width , height
// ctx.fillStyle = "green";
// ctx.fillRect(10, 10, 100, 100);

ctx.beginPath();

ctx.moveTo(10,10);
ctx.lineTo(50,10);
ctx.lineTo(50,50);
ctx.lineTo(10,50);
ctx.lineTo(10,10);
ctx.stroke();