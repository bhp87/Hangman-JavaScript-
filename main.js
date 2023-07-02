// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
const wordList = ["python", "java", "swift", "javascript"];
let WINS = 0;
let LOSES = 0;

menu();

function game(chosenWord) {
    const hiddenWord = chosenWord.replace(/\w/g, "-").split("");
    let attempt = 8;
    const guessedLetters = [];
    do {

        console.log(hiddenWord.join(''))
        const letter = input("Input a letter: ");
        if (letter.length !== 1) {
            console.log("Please, input a single letter.\n");
        } else if (letter.match(/[a-z]/) === null || letter === "") {
            console.log("Please, enter a lowercase letter from the English alphabet.\n");
        } else if (guessedLetters.includes(letter)) {
            console.log("You've already guessed this letter.\n");
        } else if (chosenWord.includes(letter)) {
            for (let i = 0; i < chosenWord.length; i++) {
                if (chosenWord[i] === letter) {
                    hiddenWord[i] = letter;
                    hiddenWord.join('');


                }
            }
            guessedLetters.push(letter);
        } else if (!chosenWord.includes(letter)) {
            console.log("That letter doesn't appear in the word.\n");
            guessedLetters.push(letter);
            attempt--;

        }
        if (hiddenWord.join('') === chosenWord) {
            youWin(hiddenWord);
            break;
        }
        if (attempt === 0) {
            youLose();
            break;
        }
    }
    while (attempt > 0)

}

function menu() {

    while (true) {
        let chosenWordIndex = Math.floor(Math.random() * wordList.length);
        let chosenWord = wordList[chosenWordIndex];
        console.log("H A N G M A N\n");
        console.log("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit:");
        const userInput = input();
        if (userInput === "play") {
            game(chosenWord);
        } else if (userInput === "results") {
            console.log(`You won: ${WINS} times 
You lost: ${LOSES} times`);
            menu();
            break;
        } else if (userInput === "exit") {
            console.log("Bye!");
            return;
        } else {
            console.log("Unknown command");
            menu();
        }
    }
}


function youLose() {
    LOSES++;
    console.log("You lost!\n");
}

function youWin(hiddenWord) {
    WINS++;
    console.log(hiddenWord.join(''))
    console.log(`You guessed the word ${hiddenWord.join('')}!
You survived!
`)

}
