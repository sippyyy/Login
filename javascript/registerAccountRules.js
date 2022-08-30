

const signUpAccountValidation = (captcha)=>{

    createCaptcha(ctxSignupAccount,safeCodeSignUpAccount,captcha)

    Validator({
        form:'.form__otp',
        input: '.form__input',
        formGroup : '.form__section',
        different: true,
        rules:[
            Validator.isRequired('#username4'),
            Validator.isRequired('#account'),
            Validator.isRequired('#safecode3'),
            Validator.isConfirm('#safecode3',captcha)
        ],
        onSubmit : (data)=>{
            $.ajax({
                url: '/WebBroker/login/registerAuthenMethod.do',
                data: data,
                cache: false,
                dataType: 'json',
                type: 'POST',
                success:  function(result){
                    if(result.jsonObj.success === false){
                        warning.classList.remove('hide')
                        warningMsg.textContent = result.jsonObj.message
                        ctxSignupAccount.clearRect(0,0,safeCodeSignUpAccount.width,safeCodeSignUpAccount.height)
                        $.get('/WebBroker/login/genCaptcha.do',function(res){
                            signUpAccountValidation(res.captcha)
                        })
                    }else{
                        warning.classList.remove('hide')
                        warningMsg.textContent = result.jsonObj.message
                    }
                },
                error: function(error){
                    console.log(error)
                }
            })
        }
    })
}


cardButton.onclick = function(){
    ctxSignupAccount.clearRect(0,0,safeCodeSignUpAccount.width,safeCodeSignUpAccount.height)

    if(matrixButton.classList.contains('active')){
        matrix = false
        matrixButton.classList.remove('active')
        cardButton.classList.add('active')

        matrixSection.classList.remove('active')
        cardSection.classList.add('active')
        $.get('/WebBroker/login/genCaptcha.do',function(res){
            signUpAccountValidation(res.captcha)
        })
    }else{
        $.get('/WebBroker/login/genCaptcha.do',function(res){
            signUpAccountValidation(res.captcha)
        })
    }
    
}
