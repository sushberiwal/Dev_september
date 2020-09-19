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
    console.log(allATags);
    let allQuesLinks = [];
    for(let i=0 ; i<allATags.length ; i++){
        let quesLink = await tab.evaluate(  function(elem){  return elem.getAttribute("href")  }  , allATags[i] );
        quesLink = `https://www.hackerrank.com${quesLink}`;
        console.log(quesLink);
        allQuesLinks.push(quesLink);
    }
    console.log(allQuesLinks);
    await addOnePageModerators(allQuesLinks);

    // check if next button is not disabled 
    // if disabled => return;
    // if not disabled
    // click on next button 
    // recursively call addModerators()
}


async function addOnePageModerators(allQuesLinks){
    for(let i=0 ; i<allQuesLinks.length ; i++){
        let newPage = await gBrowser.newPage();
        newPage.goto(allQuesLinks[i]);
        addModeratorOnOnePage(newPage);
    }
}



