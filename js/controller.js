"use strict";

import * as View from "./view.js";
import * as Model from "./model.js";

let numberPadElements;
let numDigitsPressed;

let currentTimeout;
const TIMEOUT = 3000; // 4 seconds to enter the next digit before resetting

function invalidCodeSet() {
    console.log("Set code first");
}

function resetTimer() { // each new number resets the timeout counter
    if (currentTimeout) {
        clearTimeout(currentTimeout);
    }
    currentTimeout = setTimeout(function() {
        Model.resetUserInput();
        View.resetNumberPad(numberPadElements);
    },TIMEOUT);
}

function checkCode() {
    if (Model.checkCode()) {
        // console.log("access granted");
        View.accessGranted(numberPadElements);

    } else {  // incorrect
        if (Model.incrementAttempts() < 3) {
            alert("Wrong Code!");
            Model.resetUserInput();
            View.resetNumberPad(numberPadElements);
        } else {
            alert("The police have been alerted!");
            Model.resetUserInput();
            Model.resetAttempts();
            View.resetNumberPad(numberPadElements);
        }
    };
}

function getNextNumber(num) {
    resetTimer();
    numDigitsPressed = Model.numberPadPressed(num.innerHTML); // save number pressed
    View.numberPadPressed(num);  // change to pressed appearance
     if (numDigitsPressed == 4) {
         setTimeout( () => {
             checkCode();
         }, 1000);
     }
    
}

function numberPadEventListener() {
    numberPadElements.forEach((num) => num.addEventListener("click", function() {
        getNextNumber(this);  // handle when attempt at code is made
        // if (numberPadElements[0].classList.contains("locked")) { 
        //     invalidCodeSet(); // need a valid access code
        // } else {
        // }
    }));
}

function init () {
    View.initScreen();
    document.querySelector("#submitButton").addEventListener("click", function() {
        if (Model.setCode(document.querySelector("input").value)) { // if set new code
            // numberPadElements.forEach((num) => num.classList.remove("locked"));
            View.showNumberPad();
            numberPadElements = document.querySelectorAll(".numberPad");
            numberPadEventListener();
        } else {
            View.resetAccessCodeEntryField();
        }     
    })
}

export { init }
