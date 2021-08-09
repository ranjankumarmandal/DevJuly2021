// automation code
//puppeteer's function => gives pending promise
const puppeteer = require('puppeteer');
let tab;

//build a browser or open a browser
let browserOpenPromise = puppeteer.launch({ 
    headless: false,
    defaultViewport : null,
    args : ["--start-maximized"]
 });
browserOpenPromise.then(function(browser) {
    let pagesPromise = browser.pages();
    return pagesPromise;
})
.then(function(pages) {
    // in array
    let page = pages[0];
    tab = page;
    let pageOpenPromise = tab.goto("https://www.hackerrank.com/auth/login");
    return pageOpenPromise;
})
.then(function() {
    let idTypePromise = tab.type("#input-1", "cobop71885@hyprhost.com");
    return idTypePromise;
})
.then(function() {
    let pwTypePromise = tab.type("#input-2", "Ranjan123@");
    return pwTypePromise;
})
.then(function() {
    let buttonClickPromise = tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    return buttonClickPromise;
})
.then(function() {
    let waitPromise = tab.waitForSelector("#base-card-1-link", {visible:true});
    return waitPromise;
})
.then(function() {
    let IpKitClickedPromise = tab.click("#base-card-1-link");
    return IpKitClickedPromise;
})
.then(function() {
    let waitPromise1 = tab.waitForSelector('a[data-attr1="warmup"]', {visible:true});
    return waitPromise1;
})
.then(function() {
    let warmupClickPromise = tab.click('a[data-attr1="warmup"]');
    return warmupClickPromise;
})
.then(function() {
    let waitPromise = tab.waitForSelector(".js-track-click.challenge-list-item", {visible:true});
    return waitPromise;
})
.then(function() {
    let allQuestionsPromise = tab.$$(".js-track-click.challenge-list-item");
    return allQuestionsPromise;
})  // [<a> </a>, <a> </a>, <a> </a>, <a> </a>]
.then(function(allQuestion) {  
    let allLinkPromise = [];
    for(let i = 0; i < allQuestion.length; i++) {
        let linkPendingPromise = tab.evaluate(function(element) {return element.getAttribute("href");}, allQuestion[i]);
        allLinkPromise.push(linkPendingPromise);
    }

    let allQuestionsPromise  = Promise.all(allLinkPromise); 
    return allQuestionsPromise;
})
.then(function(allLinks){
    console.log(allLinks);
})
.then(function() {
    console.log("Warm Up clicked !!!")
})
.catch(function(error) {
    console.log(error);
})



