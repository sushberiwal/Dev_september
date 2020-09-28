{/* <div class="sticky">
        <div class="sticky-header">
            <div class="minimize"></div>
            <div class="close"></div>
        </div>
        <div class="sticky-content">
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
    </div>  */}

let sticky = document.querySelector("#sticky");



sticky.addEventListener("click" , function(){

    // elements create
    let sticky = document.createElement("div");  // <div class="sticky"> </div>
    let stickyHeader = document.createElement("div");  // <div class="sticky-header"> </div>
    let minimize = document.createElement("div");  // <div class="minimize"> </div>
    let close = document.createElement("div");  // <div> </div>
    let stickyContent = document.createElement("div");  // <div> </div>
    let textArea = document.createElement("textarea");  // <textarea> </textarea>
    // classes add
    sticky.setAttribute("class" , "sticky");
    stickyHeader.setAttribute("class" , "sticky-header");
    minimize.setAttribute("class" , "minimize");
    close.setAttribute("class" , "close");
    stickyContent.setAttribute("class" , "sticky-content");
    textArea.setAttribute("rows" , "10");
    textArea.setAttribute("cols" , "30");

    //Dom Tree
    stickyHeader.appendChild(minimize);
    stickyHeader.appendChild(close);
    stickyContent.appendChild(textArea);
    sticky.appendChild(stickyHeader);
    sticky.appendChild(stickyContent);

    document.body.appendChild(sticky);  

    close.addEventListener("click" , function(){
        sticky.remove();
    })
    
    minimize.addEventListener("click" , function(){
        stickyContent.style.display = stickyContent.style.display == "none" ? "block" : "none" ;
    })
})

