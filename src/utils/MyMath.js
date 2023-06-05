
function twoDigitsStr(number) {
    return (100 + number).toString().slice(1);
}

function roundNumbetTo2Digits(number) {
    return Math.floor(number * 100) / 100;
}

export { twoDigitsStr, roundNumbetTo2Digits };