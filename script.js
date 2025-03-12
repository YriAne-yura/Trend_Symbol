const conversionTable = {
    "A": "↗️➡️↘️", "B": "⬆️↩️", "C": "↪️", "D": "⬆️↩️", "Đ": "⬆️↩️", "E": "↪️",
    "G": "↪️⬆️", "H": "⬆️➡️⬆️", "J": "⤴️", "K": "⬆️↪️", "U": "⬆️➡️⬆️",
    "X": "↩️↪️", "L": "⬇️➡️", "M": "⬆️↘️↗️⬇️", "O": "⏺️", "Ô": "⏺️", "P": "⬆️↩️",
    "Q": "⏺️↘️", "R": "⬆️↩️⤵️", "S": "💲", "T": "➡️⬆️⬅️", "V": "↖️↗️", "Y": "✂️",
    "N": "⬆️↘️⬆️", "I": "ℹ️"
};

// Tạo bảng dịch ngược
const reverseTable = Object.fromEntries(Object.entries(conversionTable).map(([k, v]) => [v, k]));

let mode = 'convert';

function removeDiacritics(str) {
    return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function convertText() {
    let input = document.getElementById("inputText").value;
    let output = "";

    if (mode === 'convert') {
        input = removeDiacritics(input).toUpperCase();
        for (let char of input) {
            output += conversionTable[char] || char;
        }
    } else if (mode === 'translate') {
        output = input;
        // Sắp xếp theo độ dài chuỗi giảm dần để tránh thay thế nhầm
        Object.keys(reverseTable).sort((a, b) => b.length - a.length).forEach(symbol => {
            output = output.split(symbol).join(reverseTable[symbol]);
        });
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

// Cập nhật số lượt truy cập
function updateVisitCount() {
    let visitCount = localStorage.getItem("visitCount") || 0;
    visitCount = parseInt(visitCount) + 1;
    localStorage.setItem("visitCount", visitCount);
    document.getElementById("visitCounter").innerText = `Lượt truy cập: ${visitCount}`;
}

// Khi trang tải, cập nhật lượt truy cập
window.onload = function () {
    updateVisitCount();
};
