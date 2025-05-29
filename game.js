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

function wordBlockLoadWords() {
    let wordBlockList = [];
    categories.forEach(category => {
        category.words.forEach(word => {
            wordBlockList.push(word);
        });
    });
    console.log(wordBlockList);
}

//change colors when word block is selected 
function toggleWordsSelected(event) {
    // Get clicked word
    let clickedWord = event.target;
    console.log(clickedWord);

    clickedWord.classList.toggle("selected");
}

wordBlocks.forEach(word => {
    word.addEventListener('click', toggleWordsSelected);
});

loadCategories();
wordBlockLoadWords();