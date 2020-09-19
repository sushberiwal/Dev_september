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
        console.log("opened login page");
    }
    catch(err){
        console.log(err);
    }

})();