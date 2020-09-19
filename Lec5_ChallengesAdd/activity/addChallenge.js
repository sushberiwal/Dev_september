const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");



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

        
        // console.log("Clicked on admin page !!!");
    }
    catch(err){
        console.log(err);
    }

})();


