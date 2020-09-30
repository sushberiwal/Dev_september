let imgUpload = document.querySelector("#img-upload");
let download = document.querySelector("#download");

imgUpload.addEventListener("change" , function(){
    console.log("input changed");
    let file = imgUpload.files[0];
    // console.log(files);
    if(file){
        let img = document.createElement("img");
        let url = URL.createObjectURL(file);
        console.log(url);
        img.src = url;
        img.setAttribute("class", "sticky-img")
        let stickyContent = createSticky();
        stickyContent.appendChild(img);
    }
})



download.addEventListener("click" , function(){
    let url = canvas.toDataURL("image/png");
    // anchor tag
    let a = document.createElement("a");
    a.setAttribute("href" , url);
    a.setAttribute("download" , "canvas.png");
    a.click();
    a.remove();
})