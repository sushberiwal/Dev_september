let body = document.querySelector("body");
let ul = document.querySelector("ul");
let input = document.querySelector("input");
let btn = document.querySelector("button");
// let h1 = document.createElement("h1");
// console.log(h1);
// h1.innerText = "Hii i am added dynamically";
// body.appendChild(h1);
// let li = document.createElement("li");
// li.innerText = "hii i am dynamic li";
// ul.appendChild(li);
// ul.innerHTML = `<li>Hii i am first li</li>
//                  <li>Hii i am second li </li>
//                  <li>Hii i am third li </li>`;


//todo list
btn.addEventListener("click" , function(){
    let value = input.value;
    input.value = "";
    // console.log(value);
    if(value){
        let li = document.createElement("li");
        let p = document.createElement("p");
        let close = document.createElement("button");
        close.innerText = "Delete"
        p.innerText = value;
        li.appendChild(p);
        li.appendChild(close);
        ul.appendChild(li);
    }
})


