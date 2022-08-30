
// Create list of random matrix keys

const randomKey = (array,alpha)=>{
    for(let i = 0 ; i<5;i++){
        array.push(`${alpha}${i+1}`)
    }
}

const aKeys = []
const bKeys = []
const cKeys = []
const dKeys = []
randomKey(aKeys,'A')
randomKey(bKeys,'B')
randomKey(cKeys,'C')
randomKey(dKeys,'D')

const keyRanges = Array.prototype.concat(aKeys,bKeys,cKeys,dKeys)

// CREATED SUCCESSFULLY LIST OF RANDOM KEY


// Random number based on the length of random key list
// The Second random number must be different from the first one

// FUNCTION SET SECOND KEYMATRIX
const setSecondKey = (first,second)=>{
    second =  Math.floor(Math.random()*keyRanges.length)
    while(second === first || second === undefined){
        second = Math.floor(Math.random()*keyRanges.length)
        if(second !== first && second !== undefined) break;
    }
        return second
}

// end function

let currentKey1 = ''
let currentKey2 = ''

const changeKeys = () =>{
    const firstKeyLogin = Math.floor(Math.random()*keyRanges.length)
    let secondKeyLogin = 'this is 2nd'
    secondKeyLogin = setSecondKey(firstKeyLogin,secondKeyLogin)
    
    currentKey1 = keyRanges[firstKeyLogin]
    currentKey2 = keyRanges[secondKeyLogin]
    
    
    // Render first keycode and second keycode to login form for matrix code identification
    
    const firstKeyCode = document.querySelector('.form__code.left')
    const secKeyCode = document.querySelector('.form__code.right')
    
    
    
    
    firstKeyCode.value = keyRanges[firstKeyLogin]
    secKeyCode.value = keyRanges[secondKeyLogin]
    
    
    // Render first keycode and second keycode to help form
    
    const firstKeyHelp = Math.floor(Math.random()*keyRanges.length)
    let secondKeyHelp = 'this is 2nd'
    secondKeyHelp = setSecondKey(firstKeyHelp,secondKeyHelp)
    
    const firstKeyMatrix = document.querySelector('.form__code-help-left')
    const secKeyMatrix = document.querySelector('.form__code-help-right')
    
    firstKeyMatrix.value =  keyRanges[firstKeyHelp]
    secKeyMatrix.value = keyRanges[secondKeyHelp]

    return currentKey1,currentKey2
}

changeKeys()

