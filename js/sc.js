const inputs = document.querySelector(".inputs");
resetBtn = document.querySelector(".reset-btn");
hint = document.querySelector(".hint span");
wrongLetter=document.querySelector(".wrong-letter span");
guessLeft=document.querySelector(".guess-left span");
PlaceHolder = document.querySelector(".placeholder");


let word,maxGuesses,corrects=[],incorrects=[];

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses=8 ,corrects=[],incorrects=[];
  

    hint.innerText = ranObj.hint;
    guessLeft.innerText=maxGuesses;
    wrongLetter.innerText=incorrects;
    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += ` <input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value;
    if (key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`) && !corrects.includes(key)) {
    
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                //showing match letter in the input value
                if (word[i] == key) {
                    corrects.push(key);
inputs.querySelectorAll("input")[i].value=key;
                }

            }
        } else {
            maxGuesses--;//decrease guesses by 1
            incorrects.push(`${key}`);
        }
    }
    guessLeft.innerText=maxGuesses;
    wrongLetter.innerText=incorrects;
    PlaceHolder.value="";
setTimeout(()=>{
    
    if(corrects.length===word.length){
        alert(`Wohoo! Congrats ,You found the Word ${word.toUpperCase()} `);
        randomWord();//calling random word func,so the game will reset
    }else if(maxGuesses<1){
        alert("Game Over!You don't have reamaining guesses");
        for (let i = 0; i < word.length; i++) {
            //showing match letter in the input value
            if (word[i] == key) {
                corrects.push(key);
inputs.querySelectorAll("input")[i].value=word[i];
            }

    }
}
});
}

resetBtn.addEventListener("click", randomWord);
PlaceHolder.addEventListener("input", initGame);
inputs.addEventListener("click",() => PlaceHolder.focus())
document.addEventListener("keydown", () => PlaceHolder.focus());