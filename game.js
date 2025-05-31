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
    wordList = shuffleArray(wordList);
    console.log(wordList);

    // Put words from wordList into wordBlocks
    for (let i = 0; i < wordBlocks.length; i++) {
        wordBlocks[i].innerText = wordList[i].word;
    }
}

//change colors when word block is selected 
function toggleWordsSelected(event) {
    // Get clicked word
    let clickedWord = event.target;

    clickedWord.classList.toggle("selected");

    // check every element in list with class selected, if more than 4 enable submit button and disable clicking possible on words
    let wrapper = document.getElementById("wrapper");

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
            console.log('find word', word)
            console.log('find wordItem', wordItem);
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

        console.log('filteredCategories', filteredCategories);

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
        // CHange colors of correct divs (with mult solved classes in css) + deselect and disable submit button again
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

let shuffleButton = document.getElementById("shuffle");
let submitButton = document.getElementById("submit");
let selectedWordBlocks = document.querySelectorAll('.selected');
shuffleButton.addEventListener("click", wordBlockLoadWords);
submitButton.addEventListener("click", checkAnswers);

loadCategories();
wordBlockLoadWords();