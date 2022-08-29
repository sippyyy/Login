

const signUpCardValidation = (captcha)=>{

    createCaptcha(ctxSafeCodeSignUp,safeCodeSignUpCard,captcha)

    Validator({
        form:'.form__matrix',
        input: '.form__input',
        formGroup : '.form__section',
        different: true,
        rules:[
            Validator.isRequired('#username3'),
            Validator.isRequired('#matrixcode'),
            Validator.isRequired('#safecode'),
            Validator.isConfirm('#safecode',captcha)
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
                    }else{
                        console.log(result.json.success)
                    }
                },
                error: function(error){
                    console.log('error',error)
                }
            })
        }
    })
}

openSignup.forEach((button, index) => {
    button.onclick = function () {
        if(matrix === true){
            $.get('/WebBroker/login/genCaptcha.do',function(res){
                signUpCardValidation(res.captcha)
            })
        }else if(matrix === false){
            $.get('/WebBroker/login/genCaptcha.do',function(res){
                signUpAccountValidation(res.captcha)
            })      
        }
        signupElement.classList.remove('hide')

    }
})


matrixButton.onclick = function(){
    ctxSafeCodeSignUp.clearRect(0,0,safeCodeSignUpCard.width,safeCodeSignUpCard.height)

    if(cardButton.classList.contains('active')){
        matrix = true
        matrixButton.classList.add('active')
        cardButton.classList.remove('active')

        matrixSection.classList.add('active')
        cardSection.classList.remove('active')
        $.get('/WebBroker/login/genCaptcha.do',function(res){
            signUpCardValidation(res.captcha)
        })
    }else{
        $.get('/WebBroker/login/genCaptcha.do',function(res){
            signUpCardValidation(res.captcha)
        })
    }
    
}


