const clipboard = document.getElementById("clipboard");
const result = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercase = document.getElementById("uppercase");
const lowercase= document.getElementById("lowercase");
const number = document.getElementById("numbers");
const symbol = document.getElementById("symbols");
const generate = document.getElementById("generate");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}
clipboard.addEventListener('click', () => {
    const textarea = document.createElement("textarea");
    const password = result.innerText;

    if (!password){
        return
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert("Password is copied to yout clipboard");
})

generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercase.checked;
    const hasUpper = uppercase.checked;
    const hasNumber = number.checked;
    const hasSymbol = symbol.checked;

    result.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})


function generatePassword(lower, upper, number, symbol, len){
    let randomPassword = '';
    const typesCount = lower + upper + number + symbol;
    const arr_types = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if (typesCount === 0){
        return '';
    }

    for(let i = 0; i < len; i += typesCount){
        arr_types.forEach(type => {
            const funcName = Object.keys(type)[0];
            randomPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = randomPassword.slice(0, len);
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}