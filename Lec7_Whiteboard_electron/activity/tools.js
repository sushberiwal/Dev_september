let undo = document.querySelector("#undo");
let redo = document.querySelector("#redo");



undo.addEventListener("click" , function(){
    //1. Remove last line from points
    removeLastLine();
    //2. UI clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //3. reDraw line using points 
    reDraw();
})


redo.addEventListener("click" , function(){
    // console.log("redo clicked");
    // console.log(redoPoints);
    if(redoPoints.length>=1){
        let lastLine = redoPoints.pop();
        for(let i=0 ; i<lastLine.length ; i++){
            points.push(lastLine[i]);
            if(lastLine[i].id=="md"){
                ctx.beginPath();
                ctx.moveTo(lastLine[i].x , lastLine[i].y);
            }
            else{
                ctx.lineTo(lastLine[i].x , lastLine[i].y);
                ctx.stroke();
            }
        }
    }
})


function removeLastLine(){
    if(points.length == 0){
        return;
    }
    let linePoints=[];
    let idx = points.length-1;
    if(idx >= 0){
        while(points[idx].id != "md" ){
           // pop from points and addFirst to point
            linePoints.unshift(points.pop());
            idx--;
        }
        linePoints.unshift(points.pop());
        redoPoints.push(linePoints);
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