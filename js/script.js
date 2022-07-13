const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter"),
typingInput = document.querySelector(".typing-input")

let word, maxGuesses, corrects = [], incorrects = []

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 5; corrects = []; incorrects = [];
    // console.log(word);

    hint.innerText = ranObj.hint
    guessLeft.innerText = maxGuesses
    wrongLetter.innerText = incorrects

    let html = ""
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled/>`
    }
    inputs.innerHTML = html
}

randomWord()

function initGame(e) {
    let key = e.target.value
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(` ${key}`) && !corrects.includes({key})) {
        // console.log(key)
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key)
                    inputs.querySelectorAll("input")[i].value = key
                }
            }
        } else {
            maxGuesses--
            incorrects.push(` ${key}`)
        }
        guessLeft.innerText = maxGuesses
        wrongLetter.innerText = incorrects
    }
    typingInput.value = ""

    setTimeout(() => {
        if (corrects.length === word.length) {
            alert(`Parabéééns, acertou a palavra! ${word.toUpperCase()}`)
            randomWord()
        } else if (maxGuesses < 1) {
            alert("Game over")
            for (let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i]
            }
        }
    })
}

resetBtn.addEventListener("click", randomWord)
document.addEventListener("input", initGame)
document.addEventListener("keydown", () => typingInput.focus())
inputs.addEventListener("click", () => typingInput.focus())