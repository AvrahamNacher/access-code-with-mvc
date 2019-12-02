"use strict";

    let appElement;
function initScreen() {
    appElement = document.querySelector("#app");
    appElement.innerHTML = `
    <div>
        <label for="code">Set a 4 digit access code:</label>
        <input type="number" id="code">
        <button id="submitButton">Submit</button>
    </div>
    `
}

function showNumberPad() {
    appElement = document.querySelector("#app");
    let html = `
    <div class="container">`;
    for (let i=1; i<=10; i++) {
        html += `<div id="num${(i<10)? i : 0}" class="numberPad default">${(i<10)? i : 0 }</div>`
    }
    html += "</div>"
    appElement.innerHTML = html;
}

function numberPadPressed(numElement) {
    // numElement.innerHTML = "clicked";
    numElement.classList.remove("default");
    numElement.classList.add("clicked");
}

function accessGranted(numElements) {
    numElements.forEach( (numElement) => {
        numElement.classList.remove("clicked", "default");
        numElement.classList.add("accessGranted");
    })
}

function resetNumberPad(numElements) {
    numElements.forEach((numElement) => {
        numElement.classList.remove("clicked");
        numElement.classList.add("default");
    })
}

function resetAccessCodeEntryField() {
    document.querySelector("#code").value = "";
}

export { 
    accessGranted,
    initScreen, 
    numberPadPressed, 
    resetAccessCodeEntryField,
    resetNumberPad,
    showNumberPad
}