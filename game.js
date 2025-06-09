// Set Date in header
let dateTitle = document.getElementById('date');
const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
dateTitle.innerText = formattedDate;


//load 4 categories
let categories = [];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function loadCategories() {
    let max = initialCategories.length;
    let randomNumbers = new Set([]);

    while (randomNumbers.size < 4) {
        let random = getRandomInt(max);
        randomNumbers.add(random);
    }
    console.log(randomNumbers.values()[0]);

    for (let number of randomNumbers) {
        categories.push(initialCategories[number]);
    }
    console.log("set: ", randomNumbers, categories)
}


//populate word blocks 
var wordBlocks = document.querySelectorAll('.word');
let wordList = [];


function wordBlockLoadWords() {
    // Load wordList
    wordList = [];

    categories.forEach(category => {
        category.words.forEach(word => {
            wordList.push({ word: word, group: category.group });
        });
    });

    // [
    //     {
    //         word: "woord1",
    //         category: "categorie1"
    //     }, // index 0
    //     {
    //         word: "woord1",
    //         category: "categorie1"
    //     } // index 1
    // ]

    // Shuffle wordList
    solvedWordBlocks = document.querySelectorAll(".solved");
    let solvedWords = [];
    solvedWordBlocks.forEach(element => {
        solvedWords.push({ word: element.innerText, color: getColor(element) });
    });
    console.log("solvedWords", solvedWords);

    // remove all colors
    wordBlocks.forEach(wordBlock => {
        wordBlock.classList.remove("solved");
        wordBlock.classList.remove("selected");
        wordBlock.classList.remove("green");
        wordBlock.classList.remove("yellow");
        wordBlock.classList.remove("blue");
        wordBlock.classList.remove("purple");
    });

    // remove solved words from wordlist before shuffle
    wordList = wordList.filter(word => !solvedWords.some(x => x.word.toLowerCase() === word.word.toLowerCase()));
    console.log('filteredWordList', wordList);
    wordList = shuffleArray(wordList);

    // add solved words back to front of word list and put the colors back
    solvedWords.sort((a, b) => a.color > b.color);
    wordList.unshift(...solvedWords);

    console.log('new wordlist', wordList);

    // Put words from wordList into wordBlocks
    for (let i = 0; i < wordBlocks.length; i++) {
        wordBlocks[i].innerText = wordList[i].word;
        if (wordList[i].color == "green") {
            wordBlocks[i].classList.add("green");
            wordBlocks[i].classList.add("solved");
        }
        if (wordList[i].color == "yellow") {
            wordBlocks[i].classList.add("yellow");
            wordBlocks[i].classList.add("solved");
        }
        if (wordList[i].color == "blue") {
            wordBlocks[i].classList.add("blue");
            wordBlocks[i].classList.add("solved");
        }
        if (wordList[i].color == "purple") {
            wordBlocks[i].classList.add("purple");
            wordBlocks[i].classList.add("solved");
        }
    }
}

/**
 * Gets a color from an HTML element
 * @param {HTMLElement} element
 */
function getColor(element) {
    if (element.classList.contains("purple")) {
        return "purple"
    }
    else if (element.classList.contains("blue")) {
        return "blue"
    }
    else if (element.classList.contains("yellow")) {
        return "yellow"
    }
    else if (element.classList.contains("green")) {
        return "green"
    }

    return "";
}


//change colors when word block is selected 
function toggleWordsSelected(event) {
    // Get clicked word
    let clickedWord = event.target;

    clickedWord.classList.toggle("selected");

    // check every element in list with class selected, if more than 4 enable submit button and disable clicking possible on word
    selectedWordBlocks = document.querySelectorAll('.selected');

    console.log('selectedWordBlocks', selectedWordBlocks);

    if (selectedWordBlocks.length == 4) {
        console.log("removing disabled from button");

        submitButton.disabled = false;
        wrapper.classList.add("saturated");
    } else {
        console.log("adding disabled to button");
        submitButton.disabled = true;
        wrapper.classList.remove("saturated");
    }
}

function checkAnswers() {
    //check if all 4 words have the same category 
    // if three are correct give popup one away...
    //selecedwords en wordlist aanspreken
    let selectedCategories = [];
    selectedWordBlocks.forEach(wordBlock => {
        let word = wordBlock.innerText;

        let wordItem = wordList.find(wordItem => {
            return wordItem.word.toLowerCase() == word.toLowerCase();
        })

        let group = wordItem.group;

        selectedCategories.push(group);
    });

    console.log('selectedCategories', selectedCategories);


    let biggestCategoryCount = 0;
    let biggestCategoryName = "";

    selectedCategories.forEach(category => {
        let filteredCategories = selectedCategories.filter(categoryName => {
            return category == categoryName;
        });

        if (filteredCategories.length > biggestCategoryCount) {
            biggestCategoryName = category;
            biggestCategoryCount = filteredCategories.length;
        }
    });
    console.log('biggesty category', biggestCategoryName, biggestCategoryCount);

    if (biggestCategoryCount == 3) {
        window.alert("One away...");
    } else if (biggestCategoryCount == 4) {
        window.alert("Correct!");

        // Check how many we have solved. so we can give different colors.
        solvedWordBlocks = document.querySelectorAll(".solved");

        let color;

        switch (solvedWordBlocks.length) {
            case 0:
                color = "green";
                break;
            case 4:
                color = "yellow";
                break;
            case 8:
                color = "blue";
                break;
            case 12:
                color = "purple";
                break;
        }

        // CHange colors of correct divs (with mult solved classes in css) + deselect and disable submit button again
        selectedWordBlocks.forEach(element => {
            element.classList.add(color);
            element.classList.add("solved");
            element.classList.remove("selected");
        });
        wrapper.classList.remove("saturated");
        submitButton.disabled = true;

        if (solvedWordBlocks.length == 12) {
            setTimeout(() => {
                window.alert("You won!");
            }, 500);
        }
    }
    else {
        mistakes--;
        mistakesElement.innerText = mistakes;

        if (mistakes == 0) {
            window.alert("Try again later");
            submitButton.disabled = true;
            shuffleButton.disabled = true;
            wrapper.classList.add("lost");
        }
    }
}

wordBlocks.forEach(word => {
    word.addEventListener('click', toggleWordsSelected);
});


function shuffleArray(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

let mistakesElement = document.getElementById("mistakes");
let mistakes = 4;
let shuffleButton = document.getElementById("shuffle");
let submitButton = document.getElementById("submit");
let selectedWordBlocks = document.querySelectorAll('.selected');
let wrapper = document.getElementById("wrapper");
let solvedWordBlocks = document.querySelectorAll(".solved");
shuffleButton.addEventListener("click", wordBlockLoadWords);
submitButton.addEventListener("click", checkAnswers);

loadCategories();
wordBlockLoadWords();