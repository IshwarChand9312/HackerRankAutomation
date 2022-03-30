const puppeteer = require("puppeteer")
const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'shaheedf05@ireprayers.com'
const password = '1234567'
const codeObj = require("./codes")
let browserOpen = puppeteer.launch({
    headless : false,
    args : ['--start-maximized'],
    defaultViewport : null
})

let page ;
browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function(newTab){

    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("input[id='input-1']",email ,{delay :50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']",password, {delay : 50})
    return passwordIsEntered
}).then(function(){

    let loginButtonClicked = page.click('button[data-analytics="LoginPassword"]', {delay : 50});
    return loginButtonClicked 
}).then(function(){

    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgoPromise 
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]',page);
    return getToWarmUp
}).then(function(){
    let waitfor3Seconds = page.waitFor(3000)
    return waitfor3Seconds
}).then(function(){
    let allChallengePromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay : 50})
    return allChallengePromise
}).then(function(questionArr){
    console.log('number of questions ', questionArr.length)
    let questionWillBeSolved = questionSolver(page, questionArr[0], codeObj.answer[0])
    return questionWillBeSolved
})

function waitAndClick(selector, cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    }) 
}

function questionSolver(page, question, answer){
    return new Promise(function(resolve, reject){
        let questionWillBeClicked = question.click()
         questionWillBeClicked.then(function(){
             let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise
         }).then(function(){
             return waitAndClick('.checkbox-input', page)
         }).then(function(){
             return page.waitForSelector('textarea.custominput', page)
         }).then(function(){
                return page.type('textarea.custominput', answer, {delay: 10})
         }).then(function(){
             let ctrlIsPressed = page.keyboard.down('Control')
             return ctrlIsPressed
         }).then(function(){
             let AIsPressed = page.keyboard.press('A', {delay:100})
             return AIsPressed
         }).then(function(){
             let XisPressed = page.keyboard.press('X', {delay:100})
             return XisPressed
         }).then(function(){
             let CtrlIsUnPressed = page.keyboard.up("Control")
             return CtrlIsUnPressed
         }).then(function(){
             let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs', page)
             return mainEditorInFocus
         }).then(function(){
             let ctrlIsPressed = page.keyboard.down('Control')
             return ctrlIsPressed
         }).then(function(){
             let AisPressed = page.keyboard.press('A',{delay:100})
             return AisPressed
         }).then(function(){
             let VisPressed = page.keyboard.press('V', {delay:100})
             return VisPressed
         }).then(function(){
             let CtrlIsUnPressed = page.keyboard.up('Control')
             return CtrlIsUnPressed
         }).then(function(){
             return page.click('.hr-monaco__run-code', {delay : 50})
         }).then(function(){
             resolve()
         }).catch(function(err){
             reject()
         })
    })
}