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
    <h3 class="warning__desc-title">Điều kiện để Anh/Chị có thể sử dụng Phương thức xác thực Smart OTP cho brokerDragon: </h3>
    <p class="warning__desc-content">1. Có Tài khoản chứng khoán tại Rồng Việt và đã đăng ký sử dụng Phương thức xác thực Smart OTP trên app iDragon.</p>
    <p class="warning__desc-content">2. Cung cấp thông tin Tài khoản chứng khoán và Tên đăng nhập* để đăng ký xác thực đăng nhập brokerDragon bằng Smart OTP. </p>
    <p class="warning__desc-content">*Lưu ý: Tài khoản chứng khoán và Tên đăng nhập phải cùng tên.</p>
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

    <label for="code" class="form__label">Mã OTP:</label>
    <input type="text" id="otpCode" name="mvOTPCode" class="form__input">

    `
}

matrixOption.onclick = function () {
    const newFirstKeyLogin = Math.floor(Math.random() * keyRanges.length)
    let newSecondKeyLogin = 'this is 2nd'
    newSecondKeyLogin = setSecondKey(newFirstKeyLogin, newSecondKeyLogin)

    optionContent.innerHTML = `
    <label for="idencode" class="form__label">Mã xác thực:</label>
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
    <label for="idencode" class="form__label">Mã xác thực:</label>
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
        <label for="otpCode" class="form__label">Mã OTP:</label>
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
















