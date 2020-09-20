const puppeteer = require("puppeteer");

const id = "fakeid1329";
const pw = "fakeid1329*";


(async function(){

    // build a browser
    let browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:["--start-maximized"]
    })
    

    let pages = await browser.pages();
    let page = pages[0];
    await page.goto("https://www.instagram.com" , {waitUntil:"networkidle0"});
    
    await page.waitForSelector('input[name="username"]' , {visible:true});
    await page.type('input[name="username"]' , id);
    await page.type('input[name="password"]' , pw);
    await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('button[type="submit"]') ]);
    // await page.waitForSelector( 'button[type="button"]' , {visible:true});
    // let btn = await page.$('button[type="button"]');
    // await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}) ,btn.click() ]);
    // await page.waitForSelector( '.mt3GC .HoLwm' , {visible:true});
    // await page.click(".mt3GC .HoLwm");
    // await page.waitForSelector('input[placeholder="Search"]' , {visible:true});
    // await page.type('input[placeholder="Search"]' , "pepper_pepcoding");
    // await page.waitForSelector( '.z556c' , {visible:true});
    // await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('.z556c')]);
    // await page.waitForSelector(".v1Nh3.kIKUG._bz0w");
    // let post = await page.$(".v1Nh3.kIKUG._bz0w");
    // await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}) , post.click()]);
    // await page.waitForSelector("section .QBdPU span" , {visible:true});
    // await page.click("section .QBdPU span");
    // for(let i=1 ; i<=32 ; i++){
    //     await Promise.all([page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('._65Bje.coreSpriteRightPaginationArrow')]);
    //     await page.waitForSelector("section .QBdPU span" , {visible:true});
    //     await page.click("section .QBdPU span");
    // }
    // console.log("33 posts liked ");


})();
