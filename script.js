document.addEventListener('copy', function (e) {
    e.preventDefault();
    e.clipboardData.setData('text', 'Nope');
});

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener('selectstart', function (e) {
    e.preventDefault();
});


let wordsToType = document.querySelector("span[words]").getAttribute("words").split(',');
let typer = document.querySelector("span[words]");
let typingSpeed = (parseInt(typer.getAttribute('typing-speed')) || 70);
let typingDelay = (parseInt(typer.getAttribute('typing-delay')) || 700);
let currentWordIndex = 0, currentCharacterIndex = 0;

function type() {
    console.log('type');
    let wordToType = wordsToType[currentWordIndex % wordsToType.length];

    if (currentCharacterIndex < wordToType.length) {
        typer.innerHTML += wordToType[currentCharacterIndex++];
        setTimeout(type, typingSpeed);
    } else {

        setTimeout(erase, typingDelay);
    }

}
function erase() {
    let wordToType = wordsToType[currentWordIndex % wordsToType.length];
    if (currentCharacterIndex > 0) {
        typer.innerHTML = wordToType.substr(0, --currentCharacterIndex - 1);
        setTimeout(erase, typingSpeed);
    } else {

        currentWordIndex++;
        setTimeout(type, typingDelay);
    }

}

window.onload = function () {
    type();
}