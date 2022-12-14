// DEFINE GLOBAL VARIABLES
const helpOpenBtn = document.querySelector('.form__btn-forget')


// constants of signup  form
const openSignup = Array.from(document.querySelectorAll('.form__sign-up'))
const signupElement = document.querySelector('.signup')
const options = Array.from(document.querySelectorAll('.signup__item'))
const formContent = Array.from(document.querySelectorAll('.signup__section'))
const closeSignup = Array.from(document.querySelectorAll('.form__btn-cancel'))


//constants for styling canvas captcha

const space = [-80,-50,-10,30,60,90]

const vertical = [-10,20,10,20,5,0]




//captcha container constants of each form
// login form
const safeCodeLogin = document.getElementById('safe-code-login')
const ctx= safeCodeLogin.getContext('2d')

//reset password form
const safeCodeHelp = document.getElementById('safe-code-help')
const ctxHelp= safeCodeHelp.getContext('2d')

//Sign Up Card form
const safeCodeSignUpCard = document.querySelector('#safe-code-signup')
const ctxSafeCodeSignUp = safeCodeSignUpCard.getContext('2d')

//Sign Up Account form
const safeCodeSignUpAccount = document.getElementById('safe-code-signup-account')
const ctxSignupAccount = safeCodeSignUpAccount.getContext('2d')


// variable to control create new captcha when change optional section of signup form
let matrix = true


// Signup Card and Sign up Account form's constants
const matrixButton = document.querySelector('.signup__item-matrix')
const matrixSection =document.querySelector('.signup__section-matrix')
const cardButton = document.querySelector('.signup__item-account')
const cardSection = document.querySelector('.signup__section-card')





// HANDLE HIDE WARNING NOTIFICATION


const closeWarning = document.querySelector('.warning__button')
const warning = document.querySelector('.warning')


closeWarning.onclick = function () {
    warning.classList.add('hide')
}




// More information login otp code option
const warningMsg = document.querySelector('.warning__desc')
const informationBtn = document.querySelector('.form__information')
var backupWarningDesc  = `
    <h3 class="warning__desc-title">??i???u ki???n ????? Anh/Ch??? c?? th??? s??? d???ng Ph????ng th???c x??c th???c Smart OTP cho brokerDragon: </h3>
    <p class="warning__desc-content">1. C?? T??i kho???n ch???ng kho??n t???i R???ng Vi???t v?? ???? ????ng k?? s??? d???ng Ph????ng th???c x??c th???c Smart OTP tr??n app iDragon.</p>
    <p class="warning__desc-content">2. Cung c???p th??ng tin T??i kho???n ch???ng kho??n v?? T??n ????ng nh???p* ????? ????ng k?? x??c th???c ????ng nh???p brokerDragon b???ng Smart OTP. </p>
    <p class="warning__desc-content">*L??u ??: T??i kho???n ch???ng kho??n v?? T??n ????ng nh???p ph???i c??ng t??n.</p>
`

informationBtn.onclick = function(){
    warningMsg.innerHTML = backupWarningDesc  
    warning.classList.remove('hide')
}

// GET CURRENT TIME

const date = document.querySelector('.header__time-date')
const time = document.querySelector('.header__time-time')


window.onload = displayClock();
function displayClock() {
    let display = new Date().toLocaleTimeString();
    time.textContent = display
    setTimeout(displayClock, 1000);
}

let calendar = new Date()

date.textContent = calendar.getDate() + "/" + (calendar.getMonth()+1) + "/" + calendar.getFullYear()



// HANDLE OPEN-CLOSE RESET PASSWORD WINDOW

const closeHelp = document.querySelector('.help__btn')
const helpElement = document.querySelector('.help')

closeHelp.onclick = function () {
    helpElement.classList.add('hide')
}



// HANDLE CHANGE optional confirmation code of LOGIN FORM

const matrixOption = document.getElementById('matrix')
const otpOption = document.getElementById('otp')

// handle change content options - login form


const optionContent = document.querySelector('.form__section-options')

otpOption.onclick = function () {

    optionContent.innerHTML = `

    <div class="form__virtual_keys" style="display:none;">
        <input class="form__input" name="mvTxtKey01" value=${currentKey1} />
        <input class="form__input" name="mvTxtKey02" value=${currentKey2} />
    </div>

    <label for="code" class="form__label">M?? OTP:</label>
    <input type="text" id="otpCode" name="mvOTPCode" class="form__input">

    `
}

matrixOption.onclick = function () {
    const newFirstKeyLogin = Math.floor(Math.random() * keyRanges.length)
    let newSecondKeyLogin = 'this is 2nd'
    newSecondKeyLogin = setSecondKey(newFirstKeyLogin, newSecondKeyLogin)

    optionContent.innerHTML = `
    <label for="idencode" class="form__label">M?? x??c th???c:</label>
    <div class="form__code-group">
        <div class="form__code-container">
        <input input value=${keyRanges[newFirstKeyLogin]} name="mvTxtKey01" class="form__code form__input left"></input>
        <input id="code" name="mvTxtValue01" class="form__input custom"></input>
    </div>
    <div class="form__code-container">
        <input id="code1" name="mvTxtValue02" class="form__input custom"></input>
        <input value=${keyRanges[newSecondKeyLogin]} name="mvTxtKey02" disabled class="form__input form__code right"></input>
    </div>
    </div>
    `

    currentKey1 = keyRanges[newFirstKeyLogin]
    currentKey2 = keyRanges[newSecondKeyLogin]
}




// HANDLE CHANGE optional confirmation code of form help (form reset password)

const maxtrixOptionHelp = document.getElementById('matrix_option')
const otpOptionHelp = document.getElementById('otp_option')



const optionContentHelp = document.querySelector('.form__section-help')

maxtrixOptionHelp.onchange = function () {
    const newFirstKeyHelp = Math.floor(Math.random() * keyRanges.length)
    let newSecondKeyHelp
    newSecondKeyHelp = setSecondKey(newFirstKeyHelp, newSecondKeyHelp)


    optionContentHelp.innerHTML = `
    <label for="idencode" class="form__label">M?? x??c th???c:</label>
    <div class="form__code-group">
        <div class="form__code-container">
            <input value=${keyRanges[newFirstKeyHelp]} name="mvTxtKey01" class="form__code form__code-help-left left"></input>
            <input id="leftcodehelp" name="mvTxtValue01" class="form__input custom"></input>
        </div>
        <div class="form__code-container">
            <input id="rightcodehelp" name="mvTxtValue02" class="form__input custom"></input>
            <input value=${keyRanges[newSecondKeyHelp]} name="mvTxtKey02" disabled class="form__input form__code-help-right form__code right"></input>
        </div>
    </div>
    `

}




otpOptionHelp.onchange = function () {
    optionContentHelp.innerHTML = `
    <div class="form__section">
        <label for="otpCode" class="form__label">M?? OTP:</label>
        <input type="text" id="otpCode" name="mvOTPCode" class="form__input">
    </div>
    `
}





// CAPTCHA RANDOM CUSTOM FUNCTION



const createCaptcha = (ctx,canvas,captcha)=>{
    ctx.font = "normal 700 60px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    for(let i = 0 ; i<captcha.length; i++){
        ctx.fillText(captcha[i], canvas.width/2 +space[i], canvas.height/2 +vertical[i]);
    }
}
















