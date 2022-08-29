const Validator = (options)=>{

    const ruleSelector   = {}
    
    const validate = (rule,inputElement)=>{
        let errorMessage
        const rules = ruleSelector[rule.selector]
        for(let i = 0 ; i<rules.length; i++){
            errorMessage = rules[i](inputElement.value)
            if(errorMessage) break;
        }

        warningMsg.textContent = errorMessage || 'Vui lòng điền đầy đủ thông tin'
        return !errorMessage
        
    }

    const formElement = document.querySelector(options.form)
    if(formElement){

        formElement.onsubmit = function(e){
            e.preventDefault()

            let formIsValid = true
            options.rules.forEach(rule=>{
                const inputElement = formElement.querySelector(rule.selector)
                let formValid = validate(rule,inputElement)
                if(!formValid){
                    return formIsValid = false
                }
            })

            if(formIsValid){
                if(options.different === false){
                    let result ={
                        mvLangId: 'vn',
                        mvOTPCode: '',
                        mvTxtKey01:'',
                        mvTxtKey02:''
                    }
                    if(typeof options.onSubmit === 'function'){
                        const inputs = formElement.querySelectorAll(options.input)
                        Array.from(inputs).map(inputElement=>{
                            if(inputElement.type === 'radio' && inputElement.checked === true){
                                result[inputElement.name] = inputElement.value
                            } else if( inputElement.type === 'text' || inputElement.type === 'password'){
                                result[inputElement.name] = inputElement.value
                            }
    
                        })
                    }
                    options.onSubmit(result)
                    return result
                }else if(options.different === true){
                    let result = {
                        mvLangId: 'vn',
                    }
                    if(typeof options.onSubmit === 'function'){
                        const inputs = formElement.querySelectorAll(options.input)
                        Array.from(inputs).map(inputElement=>{
                            if(inputElement.value && inputElement.name){
                                if(inputElement.value.startsWith('033')){
                                    result[inputElement.name] = inputElement.value.substring(3)
                                }else{
                                    result[inputElement.name] = inputElement.value
                                }
                            }else{
                                result[inputElement.dataset.name] = inputElement.dataset.value
                            }
                        })
                        console.log(result)
                    }
                    options.onSubmit(result)
                }
                

            }else{
                console.log('form status: ', false)
                warning.classList.remove('hide')
            }
        }

        options.rules.forEach(rule=>{

            if(Array.isArray(ruleSelector[rule.selector])){
                ruleSelector[rule.selector].push(rule.func)
            }else{
                ruleSelector[rule.selector] = [rule.func]
            }
            
            const inputElement = formElement.querySelector(rule.selector)
            if(inputElement){

                inputElement.onblur = function(){
                    validate(rule,inputElement)
                }
                
            }
        })
    }
}

Validator.isRequired = (selector)=>{
    return{
        selector,
        func: (value)=>{
            return value ? undefined : 'Vui lòng điền đầy đủ thông tin'
        }
    }
}

Validator.isConfirm = (selector,random)=>{
    return{
        selector,
        func : (value)=>{
            return value === random ? undefined : 'Mã an toàn không chính xác'
        }
    }
}