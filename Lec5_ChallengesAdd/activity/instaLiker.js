const puppeteer = require("puppeteer");

let id = "gargarchit603@gmail.com";
let pw = "Archit@p1";


(async function(){

    let browser = await puppeteer.launch({
        headless:false,
        slowMo : 50,
        defaultViewport:null,
        args:["--start-maximized"]
    });

    let allPages = await browser.pages();
    let tab = allPages[0];
    await tab.goto("https://www.instagram.com");
    await tab.waitForSelector('input[name="username"]' , {visible:true});
    await tab.type('input[name="username"]' , id);
    await tab.type('input[name="password"]'  ,pw);
    await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}) ,tab.click('button[type="submit"]') ]);
    await tab.waitForSelector('button[type="button"]' , {visible:true});
    let save = await tab.$('button[type="button"]');
    await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}) ,save.click() ]);
    await tab.waitForSelector(".aOOlW.HoLwm");
    await tab.click(".aOOlW.HoLwm");
    await tab.waitForSelector('input[placeholder="Search"]' , {visible:true});
    await tab.type('input[placeholder="Search"]' , "pepper_pepcoding");
    await tab.waitForSelector('.z556c' , {visible:true});
    let profile = await tab.$('.z556c');
    await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}) ,profile.click() ]);
    await tab.waitForSelector(".v1Nh3.kIKUG._bz0w" , {visible:true});
    let post =await tab.$(".v1Nh3.kIKUG._bz0w");
    await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}) ,post.click() ]);
    await tab.waitForSelector('section .QBdPU span' , {visible:true});
    await tab.click('section .QBdPU span');
    for(let i=1 ; i<=32; i++){
        await Promise.all([tab.waitForNavigation({waitUntil:"networkidle0"}) ,tab.click("._65Bje.coreSpriteRightPaginationArrow") ]);
        await tab.waitForSelector('section .QBdPU span' , {visible:true});
        await tab.click('section .QBdPU span');
    }
    console.log("All posts liked");

})();