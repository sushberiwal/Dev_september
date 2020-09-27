let undo = document.querySelector("#undo");

undo.addEventListener("click" , function(){
    //1. Remove last line from points
    removeLastLine();
    //2. UI clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //3. reDraw line using points 
    reDraw();
})


function removeLastLine(){
    if(points.length == 0){
        return;
    }

    let idx = points.length-1;
    if(idx >= 0){
        while(points[idx].id != "md" ){
            points.pop();
            idx--;
        }
        points.pop();
    }
}


function reDraw(){
    for(let i = 0 ; i<points.length ; i++){
        if(points[i].id =="md"){
            ctx.beginPath();
            ctx.moveTo(points[i].x , points[i].y);
        }
        else{
            ctx.lineTo(points[i].x , points[i].y);
            ctx.stroke();
        }
    }
}