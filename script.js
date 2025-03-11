// script.js
const conversionTable = {
    "A": "↗️➡️↘️", "B": "⬆️↩️", "C": "↪️", "D": "⬆️↩️", "Đ": "⬆️↩️", "E": "↪️",
    "G": "↪️⬆️", "H": "⬆️➡️⬆️", "J": "⤴️", "K": "⬆️↪️", "U": "⬆️➡️⬆️",
    "X": "↩️↪️", "L": "⬇️➡️", "M": "⬆️↘️↗️⬇️", "O": "⏺️", "Ô": "⏺️", "P": "⬆️↩️",
    "Q": "⏺️↘️", "R": "⬆️↩️⤵️", "S": "💲", "T": "➡️⬆️⬅️", "V": "↖️↗️", "Y": "✂️",
    "N": "⬆️↘️⬆️", "I":"ℹ️"
};
let mode = 'convert';

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function convertText() {
    let input = document.getElementById("inputText").value;
    input = removeDiacritics(input).toUpperCase();
    let output = "";
    
    for (let char of input) {
        if (mode === 'convert' && conversionTable[char]) {
            output += conversionTable[char];
        } else {
            output += char;
        }
    }
    document.getElementById("output").innerText = output;
}

function copyToClipboard() {
    const output = document.getElementById("output").innerText;
    navigator.clipboard.writeText(output).then(() => {
        alert("Copied to clipboard!");
    });
}

function setMode(newMode) {
    mode = newMode;
    convertText();
}