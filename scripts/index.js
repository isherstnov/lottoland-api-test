"use strict";

var AJAX_URL = "https://media.lottoland.com/api/drawings/euroJackpot";
var TIERS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
var MATCHS = ["5 Numbers, 2 Euronumbers", "5 Numbers, 1 Euronumber", "5 Numbers, 0 Euronumbers", "4 Numbers, 2 Euronumbers", "4 Numbers, 1 Euronumber", "4 Numbers, 0 Euronumber", "3 Numbers, 2 Euronumbers", "2 Numbers, 2 Euronumbers", "3 Numbers, 1 Euronumber", "3 Numbers, 0 Euronumbers", "1 Number, 2 Euronumbers", "2 Numbers, 1 Euronumber"];

function initAjax() {
    var script = document.createElement('script');
    script.src = AJAX_URL + "?callback=setData";

    document.getElementsByTagName('head')[0].appendChild(script);
}

function setData(data) {
    setDate(data);
    setNumbers(data);
    setTable(data);
}

function setDate(response) {
    var day = response.last.date.day;
    var month = response.last.date.month;
    var year = response.last.date.year;
    document.getElementById("results-title").innerHTML = "\n        EuroJackpot Results for " + day + "/" + month + "/" + year;
}

function setNumbers(response) {
    var numbers = response.last.numbers;
    var euroNumbers = response.last.euroNumbers;

    var numbersToAdd = buildNumbersElements(numbers, "number");
    var euroNumbersToAdd = buildNumbersElements(euroNumbers, "euro-number");

    addNumbers(numbersToAdd);
    addNumbers(euroNumbersToAdd);
}

function setTable(response) {
    var tableBodyContent = buildTableBodyContent(response);
    var tableBody = document.getElementsByTagName("tbody")[0];
    tableBody.innerHTML = tableBody.innerHTML + tableBodyContent;
}

function buildNumbersElements(numbers, className) {
    var numbersToAdd = "";
    numbers.forEach(function (number) {
        return numbersToAdd += "<span class=\"" + className + "\">" + number + "</span>";
    });
    return numbersToAdd;
}

function addNumbers(numbers) {
    var div = document.getElementById('results');
    div.innerHTML = div.innerHTML + numbers;
}

function buildTableBodyContent(response) {
    var tableBodyContent = "";
    var oddsArray = Object.keys(response.last.odds).map(function (key) {
        return response.last.odds[key];
    });

    oddsArray.forEach(function (odd, index) {
        if (index !== 0) {
            var prize = odd.prize.toLocaleString();
            var winners = odd.winners.toLocaleString();
            var row = createRowTable(index, prize, winners);
            tableBodyContent += row;
        }
    });

    return tableBodyContent;
}

function createRowTable(index, prize, winners) {
    var tier = TIERS[index - 1];
    var match = MATCHS[index - 1];
    return "<tr>\n                <td class=\"tier\">\n                    <span class=\"tier-title\">Tier </span>" + tier + "\n                </td>\n                <td class=\"match\">" + match + "</td>\n                <td class=\"winners\">" + winners + "x</td>\n                <td class=\"amount\">\u20AC" + prize + "</td>\n            </tr>";
}