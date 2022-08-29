
helpOpenBtn.onclick= function(){

    $.get('/WebBroker/login/genCaptcha.do',function(res){
        currentCaptcha = res.captcha
        helpElement.classList.remove('hide');

        createCaptcha(ctxHelp,safeCodeHelp,currentCaptcha)

        Validator({
        form:'.form__forget',
        input: '.form__input',
        different:false,
        formGroup : '.form__section',
        rules:[
            Validator.isRequired('#user_name'),
            Validator.isRequired('#leftcodehelp'),
            Validator.isRequired('#rightcodehelp'),
            Validator.isRequired('#safecode2'),
            Validator.isConfirm('#safecode2', currentCaptcha)

        ],
        onSubmit : (data)=>{
            $.ajax({
                url: '/WebBroker/login/resetPassword.do',
                data: data,
                cache: false,
                dataType: 'json',
                type:'POST',
                success:function(result){
                    if(result.jsonObj.success === false){
                        warning.classList.remove('hide')
                        warningMsg.textContent = result.jsonObj.message
                    }else{
                        warning.classList.remove('hide')
                        warningMsg.textContent = result.jsonObj.message
                    }
                },
                error: function(result){
                    console.log('error:', result)
                }
            })
        }
    })

    otpOptionHelp.onclick =function(){
    Validator({
    form:'.form__forget',
    different:false,
    input: '.form__input',
    formGroup : '.form__section',
    rules:[
        Validator.isRequired('#user_name'),
        Validator.isRequired('#otpCode'),
        Validator.isRequired('#safecode2'),
        Validator.isConfirm('#safecode2', currentCaptcha)

    ],
    onSubmit : (data)=>{
        $.ajax({
            url: '/WebBroker/login/resetPassword.do',
            data: data,
            cache: false,
            dataType: 'json',
            type:'POST',
            success:function(result){
                if(result.jsonObj.success === false){
                    warning.classList.remove('hide')
                    warningMsg.textContent = result.jsonObj.message
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

maxtrixOptionHelp.onclick = function(){
    Validator({
    form:'.form__forget',
    input: '.form__input',
    formGroup : '.form__section',
    different: false,
    rules:[
        Validator.isRequired('#user_name'),
        Validator.isRequired('#leftcodehelp'),
        Validator.isRequired('#rightcodehelp'),
        Validator.isRequired('#safecode2'),
        Validator.isConfirm('#safecode2', currentCaptcha)

    ],
    onSubmit : (data)=>{
        $.ajax({
            url: '/WebBroker/login/resetPassword.do',
            data: data,
            cache: false,
            dataType: 'json',
            type:'POST',
            success:function(result){
                if(result.jsonObj.success === false){
                    warning.classList.remove('hide')
                    warningMsg.textContent = result.jsonObj.message
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
    })
}





