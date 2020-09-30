function createSticky(){
     // elements create
     let sticky = document.createElement("div");  // <div class="sticky"> </div>
     let stickyHeader = document.createElement("div");  // <div class="sticky-header"> </div>
     let minimize = document.createElement("div");  // <div class="minimize"> </div>
     let close = document.createElement("div");  // <div> </div>
     let stickyContent = document.createElement("div");  // <div> </div>
     
    // classes add
    sticky.setAttribute("class" , "sticky");
    stickyHeader.setAttribute("class" , "sticky-header");
    minimize.setAttribute("class" , "minimize");
    close.setAttribute("class" , "close");
    stickyContent.setAttribute("class" , "sticky-content");

     //Dom Tree
     stickyHeader.appendChild(minimize);
     stickyHeader.appendChild(close);
     sticky.appendChild(stickyHeader);
     sticky.appendChild(stickyContent);

     document.body.appendChild(sticky); 

     close.addEventListener("click" , function(){
        sticky.remove();
    })
    
    minimize.addEventListener("click" , function(){
        stickyContent.style.display = stickyContent.style.display == "none" ? "block" : "none" ;
    })

    let initialX;
    let initialY;
    let stickyHolded = false;
    stickyHeader.addEventListener("mousedown" , function(e){
        stickyHolded = true;
        initialX = e.clientX;
        initialY = e.clientY;
    })

    window.addEventListener("mousemove" , function(e){
        if(stickyHolded){
            let finalX = e.clientX;
            let finalY = e.clientY;
            let dx = finalX - initialX;
            let dy = finalY - initialY;
            // displacement 
            // sticky => top + dy
            // sticky => left + dx
             let {top , left} = sticky.getBoundingClientRect();
             sticky.style.top = top+dy+"px";
             sticky.style.left = left+dx+"px";
             initialX = finalX;
             initialY = finalY;
        }
    })

    stickyHeader.addEventListener("mouseup" , function(e){
        stickyHolded = false;
    })

    return stickyContent;
}