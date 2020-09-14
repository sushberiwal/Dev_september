const puppeteer = require("puppeteer");
const { id, pw } = require("./credentials");
let tab;
// puppeteer functions => Pending Promise dete hain
//it will launch a browser
const browserPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
//   slowMo: 50,
  args: ["--start-maximized"],
});
browserPromise
  .then(function (browser) {
    let allPagesPromise = browser.pages();
    return allPagesPromise;
  })
  .then(function (pages) {
    // array of all the pages opened
    let page = pages[0];
    tab = page;
    let loginPagePromise = page.goto("https://www.hackerrank.com/auth/login");
    return loginPagePromise;
  })
  .then(function () {
    let idTypedPromise = tab.type("#input-1", id);
    return idTypedPromise;
  })
  .then(function () {
    let pwTypedPromise = tab.type("#input-2", pw);
    return pwTypedPromise;
  })
  .then(function () {
    let loginClickedPromise = tab.click(
      ".ui-btn.ui-btn-large.ui-btn-primary.auth-button"
    );
    return loginClickedPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector("#base-card-1-link", {
      visible: true,
    });
    return waitPromise;
  })
  .then(function () {
    let ipKitClickedPromise = tab.click("#base-card-1-link");
    return ipKitClickedPromise;
  })
  .then(function () {
    let waitPromise = tab.waitForSelector('a[data-attr1="warmup"]', {visible: true,});
    return waitPromise;
  })
  .then(function () {
    let warmUpCLickedPromise = tab.click('a[data-attr1="warmup"]');
    return warmUpCLickedPromise;
  })
  .then(function(){
      let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item" , {visible:true});
      return waitPromise;
  })
  .then(function(){
      let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
      //[ PP , PP , PP , PP];
      // it will return array of all the elements
      return allATagsPromise;
  })
  .then(function(allATags){
      // allATags =>? [   <a> </a> , <a> </a>  , <a> </a> , <a> </a> ];
      let allLinksPromise = []; //=> keep on pushing pending promise of links
      for(let i=0 ; i<allATags.length ; i++){
          let linkPromise = tab.evaluate( function(elem){    return elem.getAttribute("href")  }  , allATags[i])
          allLinksPromise.push(linkPromise);
        }
        return Promise.all(allLinksPromise);
  })
  .then(function(allLinks){
      console.log(allLinks);
  })
  .catch(function(err){
      console.log(err);
  })
