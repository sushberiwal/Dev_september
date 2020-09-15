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
    let waitAndClickedPromise = waitAndClick("#base-card-1-link");
    return waitAndClickedPromise;
  })
  .then(function () {
    let waitAndClickedPromise = waitAndClick('a[data-attr1="warmup"]');
    return waitAndClickedPromise;
  })
  .then(function(){
      let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item" , {visible:true});
      return waitPromise;
  })
  .then(function(){
      //$$ => to get multiple elements with same class
      let allATagsPromise = tab.$$(".js-track-click.challenge-list-item");
      //[ PP , PP , PP , PP];
      // it will return array of all the elements
      return allATagsPromise;
  })
  .then(function(allATags){
      // allATags =>? [   <a> </a> , <a> </a>  , <a> </a> , <a> </a> ];
      let allLinksPromise = []; //=> keep on pushing pending promise of links
      for(let i=0 ; i<allATags.length ; i++){
          let linkPromise = tab.evaluate( function(elem){    return elem.getAttribute("href")  }  ,   allATags[i] ); 
          allLinksPromise.push(linkPromise);
        }
        let allLinks =  Promise.all(allLinksPromise);
        return allLinks;
  })
  .then(function(allLinks){
    let link = allLinks[0];
    let completeLink = `https://www.hackerrank.com${link}`;
    let questionSolvedPromise =  questionSubmitter(completeLink);
    return questionSolvedPromise;
  })
  .then(function(){
    console.log("one question solved !!!!");
  })
  .catch(function(err){
      console.log(err);
  })

  
  function waitAndClick(selector){
    return new Promise(function(resolve,reject){
      let waitPromise = tab.waitForSelector(selector, {visible: true,});
      waitPromise.then(function(){
        let clickedPromise = tab.click(selector);
        return clickedPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(err){
        reject(err);
      })
    });
  }


  function getCode(){
    return new Promise(function(resolve,reject){
      let wait = tab.waitForSelector(".hackdown-content h3" , {visible:true});
      wait.then(function(){
        let codeNamesP = tab.$$(".hackdown-content h3");
        // [ PPcodeNames , PPcodeNames , PPcodeNames ];
        let codesP = tab.$$(".hackdown-content .highlight");
        // [ PPcodes , PPcodes , PPcodes ];
        let nameAndCodesPromise = Promise.all( [ codeNamesP  , codesP  ]);
        // [  [ PPcodeNames , PPcodeNames , PPcodeNames ] , [ PPcodes , PPcodes , PPcodes ]  ];
        return nameAndCodesPromise;
      })
    .then(function(namesAndCodes){
      let codeNamesElement = namesAndCodes[0];
      //[  <h3>C++</h3> , <h3>python</h3> , <h3>java</h3>  ]
      // let codes = namesAndCodes[1];
      //[  <div> c++ ka code<div> , <div>python ka code </div> , <div> java ka code</div>   ]
      let codeNamesPromise=[];
      for(let i=0 ; i<codeNamesElement.length ; i++){
        let codeNameP = tab.evaluate( function(elem){  return elem.textContent  } , codeNamesElement[i])
        codeNamesPromise.push(codeNameP);
      }
      return Promise.all(codeNamesPromise);
    })
    .then(function(codeNames){
      console.log("u should get code names");
      console.log(codeNames);
    })
  })
}

  function questionSubmitter(qLink){
    return new Promise(function(resolve , reject){
       let navigatedToQues = tab.goto(qLink);
       navigatedToQues.then(function(){
         let waitAndClickedPromise = waitAndClick('a[data-attr2="Editorial"]');
         return waitAndClickedPromise;
       })
       .then(function(){
         let getCodePromise = getCode();
         return getCodePromise;
       })
       .then(function(){
         console.log("got the code");
       })
    });
  }