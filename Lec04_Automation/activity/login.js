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
    let pageOpenPromise = page.goto("https://www.hackerrank.com/auth/login");
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
    console.log("logged in !!!")
})
.catch(function(error) {
    console.log(error);
})



