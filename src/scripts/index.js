const AJAX_URL = "https://media.lottoland.com/api/drawings/euroJackpot";
const TIERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const MATCHS = ["5 Numbers, 2 Euronumbers", "5 Numbers, 1 Euronumber", "5 Numbers, 0 Euronumbers",
    "4 Numbers, 2 Euronumbers", "4 Numbers, 1 Euronumber", "4 Numbers, 0 Euronumber",
    "3 Numbers, 2 Euronumbers", "2 Numbers, 2 Euronumbers", "3 Numbers, 1 Euronumber",
    "3 Numbers, 0 Euronumbers", "1 Number, 2 Euronumbers", "2 Numbers, 1 Euronumber"];

function initAjax() {
    let script = document.createElement('script');
    script.src = AJAX_URL + "?callback=setData";

    document.getElementsByTagName('head')[0].appendChild(script);
}

function setData(data) {
    setDate(data);
    setNumbers(data);
    setTable(data);
}

function setDate(response) {
    let day = response.last.date.day;
    let month = response.last.date.month;
    let year = response.last.date.year;
    document.getElementById("results-title").innerHTML = `
        EuroJackpot Results for ${day}/${month}/${year}`;
}

function setNumbers(response) {
    let numbers = response.last.numbers;
    let euroNumbers = response.last.euroNumbers;

    let numbersToAdd = buildNumbersElements(numbers, "number");
    let euroNumbersToAdd = buildNumbersElements(euroNumbers, "euro-number");

    addNumbers(numbersToAdd);
    addNumbers(euroNumbersToAdd);
}

function setTable(response) {
    let tableBodyContent = buildTableBodyContent(response);
    let tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = tableBody.innerHTML + tableBodyContent;
}

function buildNumbersElements(numbers, className) {
    let numbersToAdd = ``;
    numbers.forEach(number => numbersToAdd += `<span class="${className}">${number}</span>`);
    return numbersToAdd;
}

function addNumbers(numbers) {
    let div = document.getElementById('results');
    div.innerHTML = div.innerHTML + numbers;
}

function buildTableBodyContent(response) {
    let tableBodyContent = ``;
    let oddsArray = Object.keys(response.last.odds).map(key => response.last.odds[key]);

    oddsArray.forEach((odd, index) => {
        if (index !== 0) {
            let prize = odd.prize.toLocaleString();
            let winners = odd.winners.toLocaleString();
            let row = createRowTable(index, prize, winners);
            tableBodyContent += row;
        }
    });

    return tableBodyContent;
}

function createRowTable(index, prize, winners) {
    let tier = TIERS[index - 1];
    let match = MATCHS[index - 1];
    return `<tr>
                <td class="tier">
                    <span class="tier-title">Tier </span>${tier}
                </td>
                <td class="match">${match}</td>
                <td class="winners">${winners}x</td>
                <td class="amount">€${prize}</td>
            </tr>`;
}