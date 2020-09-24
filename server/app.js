const express = require("express");
const pupp = require("puppeteer");
const app = express();

app.get("/home" , async function(req , res){
    let browser = await pupp.launch({
        defaultViewport:null,
        args:["--start-maximized"]
    })
    let allPages = await browser.pages();
    let page = allPages[0];
    await page.goto("https://javascript.info/");
    await page.waitForSelector(".list .list__item" , {visible:true});
    let allItems = await page.$$(".list .list__item");
    let names=[];
    for(let i=0 ; i<allItems.length ; i++){
        let title = await allItems[i].$(".list__title a");
        // console.log(title);
        let name = await page.evaluate( function(elem){  return elem.textContent;    }   , title);
        names.push(name);
    }

    res.json({
        names : names
    })
})

app.listen(5500 , function(){
    console.log("Server started at port 3000");
})
