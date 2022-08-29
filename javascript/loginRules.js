


const loginFunction = (captcha)=>{

        safeCodeLogin.textContent = captcha

        createCaptcha(ctx,safeCodeLogin,captcha)

        Validator({
            form: '.form__login',
            input: '.form__input',
            formGroup : '.form__section',
            different:  false,
            rules:[
                Validator.isRequired('#username'),
                Validator.isRequired('#password'),
                Validator.isRequired('#code'),
                Validator.isRequired('#code1'),
                Validator.isRequired('#safecode1'),
                Validator.isConfirm('#safecode1',captcha)
            ],
            onSubmit : (data)=>{
                $.ajax({
                    url: '/WebBroker/login/login.rv',
                    data:data,
                    cache: false,
                    dataType: 'json',
                    type:'POST',
                    success:function(result){
                        if(result.success === false){
                            warning.classList.remove('hide')
                            warningMsg.textContent = result.message
                            $.get('/WebBroker/login/genCaptcha.do',function(res){
                                ctx.clearRect(0,0,safeCodeLogin.width,safeCodeLogin.height)
                                ctxHelp.clearRect(0,0,safeCodeLogin.width,safeCodeLogin.height)
                        
                                loginFunction(res.captcha)
                            })
                            changeKeys()
                        }else{
                            if(window.innerWidth >= 1080){
                            location.replace("http://10.1.43.207:9999/WebBroker/")
                            }else{
                                location.replace("http://10.1.43.207:9999/WebBroker/html/")
                            }
                        }
                    },
                    error: function(result){
                        console.log('error:', result)
                    }
                })
            }
        })
        
                
        
        otpOption.onchange = function(){
            Validator({
            form: '.form__login',
            input: '.form__input',
            formGroup : '.form__section',
            different: false,
            rules:[
                Validator.isRequired('#username'),
                Validator.isRequired('#password'),
                Validator.isRequired('#otpCode'),
                Validator.isRequired('#safecode1'),
                Validator.isConfirm('#safecode1',captcha)
            ],
            onSubmit : (data)=>{
                $.ajax({
                    url: '/WebBroker/login/login.rv',
                    data:data,
                    cache: false,
                    dataType: 'json',
                    type:'POST',
                    success:function(result){
                        if(result.success === false){
                            warning.classList.remove('hide')
                            warningMsg.textContent = result.message
                        }else{
                            console.log(result)
                        }
                    },
                    error: function(result){
                        console.log('error:', result)
                    }
                })
            }
        })
        }
    
        matrixOption.onchange=function(){
            Validator({
            form: '.form__login',
            input: '.form__input',
            formGroup : '.form__section',
            different: false,
            rules:[
                Validator.isRequired('#username'),
                Validator.isRequired('#password'),
                Validator.isRequired('#code'),
                Validator.isRequired('#code1'),
                Validator.isRequired('#safecode1'),
                Validator.isConfirm('#safecode1',captcha)
            ],
            onSubmit : (data)=>{
                $.ajax({
                    url: '/WebBroker/login/login.rv',
                    data:data,
                    cache: false,
                    dataType: 'json',
                    type:'POST',
                    success:function(result){
                        if(result.success === false){
                            $.get('/WebBroker/login/genCaptcha.do',function(res){
                                loginFunction(res.captcha)
                            })
                            warning.classList.remove('hide')
                            warningMsg.textContent = result.message
                        }else{
                            console.log(result)
                        }
                    },
                    error: function(result){
                        console.log('error:', result)
                    }
                })
            }
        })
        }
    }
   
$.get('/WebBroker/login/genCaptcha.do',function(res){
    loginFunction(res.captcha)
})

document.querySelector('.help__btn').onclick = function(){
    $.get('/WebBroker/login/genCaptcha.do',function(res){
        ctx.clearRect(0,0,safeCodeLogin.width,safeCodeLogin.height)
        ctxHelp.clearRect(0,0,safeCodeLogin.width,safeCodeLogin.height)

        loginFunction(res.captcha)
    })
    helpElement.classList.add('hide')
}

closeSignup.forEach(button => {

    button.onclick = function () {
        signupElement.classList.add('hide')
        $.get('/WebBroker/login/genCaptcha.do',function(res){
            loginFunction(res.captcha)
        })
        ctx.clearRect(0,0,safeCodeLogin.width,safeCodeLogin.height)
        ctxSignupAccount.clearRect(0,0,safeCodeSignUpAccount.width,safeCodeSignUpAccount.height)
        ctxSafeCodeSignUp.clearRect(0,0,safeCodeSignUpCard.width,safeCodeSignUpCard.height)
    }
})


        