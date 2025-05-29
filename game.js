// Set Date in header
let dateTitle = document.getElementById('date');
const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
dateTitle.innerText = formattedDate;

let groups = [];
var words = document.querySelectorAll('.word');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function selectCategories() {
    let max = categories.length;
    let randomNumbers = new Set([]);

    while (randomNumbers.size < 4) {
        let random = getRandomInt(max);
        randomNumbers.add(random);
    }
    console.log(randomNumbers.values()[0]);

    for (let number of randomNumbers) {
        groups.push(categories[number]);
    }
    console.log("set: ", randomNumbers, groups)
}

function wordBlockLoadWords() {
    let wordBlockList = [];
    groups.forEach(group => {
        group.words.forEach(word => {
            wordBlockList.push(word);
        });
    });
    console.log(wordBlockList);
}







function toggleWordsSelected(event) {
    // Get clicked word
    let clickedWord = event.target;
    console.log(clickedWord);

    // Change color of clicked word
    // Add "selected" css class
    clickedWord.classList.toggle("selected");
}

words.forEach(word => {
    word.addEventListener('click', toggleWordsSelected);
});


selectCategories();
wordBlockLoadWords();