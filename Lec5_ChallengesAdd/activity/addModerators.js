const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");

let tab;
let gBrowser;

(async function(){
    try{
        let browser  = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            //   slowMo: 50,
            args: ["--start-maximized"],
          });
          gBrowser = browser;
        let allPages = await browser.pages();
        let page = allPages[0];
        tab = page;
        
        await page.goto("https://www.hackerrank.com/auth/login");
        // console.log("opened login page");
        await page.type("#input-1", id);
        await page.type("#input-2", pw);
        await clickAndWait(".ui-btn.ui-btn-large.ui-btn-primary.auth-button");
        await page.click('a[data-analytics="NavBarProfileDropDown"]');
        await clickAndWait('a[data-analytics="NavBarProfileDropDownAdministration"]');
        let aTags = await page.$$(".nav-tabs.nav.admin-tabbed-nav li a");
        await Promise.all([  page.waitForNavigation({waitUntil:"networkidle0"})   , aTags[1].click() ]);
        let url = await page.url();
        await addModerators();

    }
    catch(err){
        console.log(err);
    }

})();
async function clickAndWait(selector){
    try{
        await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle0"}) ,tab.click(selector)]);
    }
    catch(err){
        console.log(err);
    }
}


async function addModerators(){
    await tab.waitForSelector(".backbone.block-center" , {visible:true});
    let allATags = await tab.$$(".backbone.block-center");
    // console.log(allATags);
    let allQuesLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let quesLink = await tab.evaluate(  function(elem){  return elem.getAttribute("href")  }  , allATags[i] );
        quesLink = `https://www.hackerrank.com${quesLink}`;
        // console.log(quesLink);
        allQuesLinks.push(quesLink);
    }
    // console.log(allQuesLinks);
    await addOnePageModerators(allQuesLinks);
    
    let allLis = await tab.$$(".pagination li");
    let nextBtn = allLis[allLis.length-2];
    
    let isDisabled =  await tab.evaluate( function(elem){ return elem.classList.contains("disabled")  } , nextBtn);
    
    // if disabled => return;
    if(isDisabled){
        return;
    }
    // if not disabled
    // click on next button 
    await Promise.all([ tab.waitForNavigation({waitUntil:"networkidle0"})  ,  nextBtn.click()]);
    // recursively call addModerators()
    addModerators();
}

async function createModerator(newPage , link){
    try{
        await newPage.goto(link , {waitUntil:"networkidle0"});
        await newPage.waitForSelector('li[data-tab="moderators"]' , {visible:true});
        await Promise.all([newPage.waitForNavigation({waitUntil:"networkidle0"})   , newPage.click('li[data-tab="moderators"]')]);
        await newPage.waitForSelector("#moderator" , {visible:true});
        await newPage.type("#moderator" , "sushant");
        await newPage.keyboard.press("Enter");
        await newPage.click(".save-challenge.btn.btn-green");
        await newPage.close();
    }
    catch(err){
        console.log(err);
    }
}

async function addOnePageModerators(allQuesLinks){
    try{
        for(let i=0 ; i<allQuesLinks.length ; i++){
            let newPage = await gBrowser.newPage();
            createModerator(newPage , allQuesLinks[i]);
        }
    }
    catch(err){
        console.log(err);
    }
}



