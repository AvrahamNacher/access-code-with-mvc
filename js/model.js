"use strict";

// class Security {
//     constructor (_code)    
//         { this.code  = _code }
// }

// function setCode(newCode) {
//   let theCode = new Security(newCode)
//   return theCode
// }

let code;
let userInput = "";
let attempt = 0;

function setCode(newCode) {
    if (newCode.length == 4) {
        code = newCode;
        // console.log("code set " + code);
        return true;
    } else {
        console.log("Need 4 digits");
        return false;
    }
}

function checkCode() {
    return (userInput == code);
}

function numberPadPressed(num) {
    userInput += num;

    return userInput.length;
}

function incrementAttempts() {
    attempt++;
    return attempt;
}

function resetAttempts() {
    attempt = 0;
}

function resetUserInput() {
    userInput = "";
}

export { 
    checkCode, 
    incrementAttempts, 
    numberPadPressed, 
    resetAttempts, 
    resetUserInput, 
    setCode 
}