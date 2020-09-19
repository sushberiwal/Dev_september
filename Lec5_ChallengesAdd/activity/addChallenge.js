const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");
let challenges = require("./challenges");
let tab;

(async function(){
    try{
        let browser  = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            //   slowMo: 50,
            args: ["--start-maximized"],
          });
        let allPages = await browser.pages();
        let page = allPages[0];
        tab = page;
        
        await page.goto("https://www.hackerrank.com/auth/login");
        // console.log("opened login page");
        await page.type("#input-1", id);
        await page.type("#input-2", pw);
        await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button") ]);
        // await page.waitForSelector('a[data-analytics="NavBarProfileDropDown"]' , {visible:true});
        await page.click('a[data-analytics="NavBarProfileDropDown"]');
        await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('a[data-analytics="NavBarProfileDropDownAdministration"]')]);
        let aTags = await page.$$(".nav-tabs.nav.admin-tabbed-nav li a");
        await Promise.all([  page.waitForNavigation({waitUntil:"networkidle0"})   , aTags[1].click() ]);
        let url = await page.url();
        await Promise.all([ page.waitForNavigation({waitUntil:"networkidle0"}) , page.click('.btn.btn-green.backbone.pull-right')]);
        await createChallenge(challenges[0]);
        // console.log("Clicked on admin page !!!");
    }
    catch(err){
        console.log(err);
    }

})();


async function createChallenge(challenge){
    let challengeName = challenge["Challenge Name"];
    let description = challenge["Description"];
    let probStatement = challenge["Problem Statement"];
    let input = challenge["Input Format"];
    let constraints = challenge["Constraints"];
    let output = challenge["Output Format"];
    let tags = challenge["Tags"];

    await tab.waitForSelector('#name' , {visible:true});
    await tab.type("#name" , challengeName);
    await tab.type("#preview" , description);
    await tab.type("#problem_statement-container .CodeMirror textarea" , probStatement);
    await tab.type("#input_format-container .CodeMirror textarea" , input);
    await tab.type("#constraints-container .CodeMirror textarea" , constraints);
    await tab.type("#output_format-container .CodeMirror textarea" , output);
    await tab.type("#tags_tag" , tags);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");

}


