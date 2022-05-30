// Buttons & CheckBoxes From DOM

const result = document.getElementById("result");
const copyToClipboard = document.getElementById("copyToClipBoard");
const checkLength = document.getElementById("length");
const checkUpper = document.getElementById("upperCheck");
const checkLower = document.getElementById("lowerCheck");
const checkNumbers = document.getElementById("numberCheck");
const checkSymbol = document.getElementById("symbolCheck");
const generatePassBtn = document.getElementById("genPass");

const randomFunctions = {
  upper: randomUpper,
  lower: randomLower,
  number: randomNumber,
  symbol: randomSymbol,
};

// Creating Event Listeners

generatePassBtn.addEventListener("click", () => {
  const length = +checkLength.value;
  const isUpper = checkUpper.checked;
  const isLower = checkLower.checked;
  const isNumber = checkNumbers.checked;
  const isSymbol = checkSymbol.checked;

  result.value = generatePassword(isUpper, isLower, isNumber, isSymbol, length);
});

copyToClipboard.addEventListener("click", () => {
  const result = document.getElementById("result");

  result.select();
  navigator.clipboard.writeText(result.value);
});
// Generate Password Function

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunctions[funcName]();
    });
  }
  console.log(generatedPassword.slice(0, length));
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Get Random Upper Case Alphabet

function randomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// Get Random Lower Case Alphabet

function randomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Get Random Number

function randomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Get Random Symbol

function randomSymbol() {
  const symbols = "!@#$%^&*()";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
