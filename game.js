// Set Date in header
let dateTitle = document.getElementById('date');
const date = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = date.toLocaleDateString('en-US', options);
dateTitle.innerText = formattedDate;

let group1, group2, group3, group4;

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

    console.log("set: ", randomNumbers)
}

selectCategories();