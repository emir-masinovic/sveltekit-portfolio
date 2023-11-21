function handleButtonClick(event) {
    const pressedButton = event.target.innerText;

    if (inputArray === '' && pressedButton === '0') return;

    // Case 1: When the first thing user inputs is an operation
    if (inputArray === '' && ['+', '-', '*', '/'].includes(pressedButton)) {
    inputArray = '0' + pressedButton;
    updateDisplay();
    return;
}

    // Case 2: When there are two operations next to each other
    const lastChar = inputArray.charAt(inputArray.length - 1);
    if (['+', '-', '*', '/'].includes(lastChar) && ['+', '-', '*', '/'].includes(pressedButton)) {
    // Replace the last operator with the new one
    inputArray = inputArray.slice(0, -1) + pressedButton;
    updateDisplay();
    return;
}

    switch (pressedButton) {
    case 'AC':
    handleACButton();
    break;
    case '=':
    handleEqualsButton();
    break;
    case 'x²':
    handleSquareButton();
    break;
    case '√':
    handleRootButton();
    break;
    case '%':
    handlePercentageButton();
    break;
    default:
    handleNumberButton(pressedButton);
    break;
}
}

function handleNumberButton(pressedButton) {
    inputArray += pressedButton;
    updateDisplay();
}

function handlePercentageButton() {
    inputArray += '* 0.01 *';
    updateDisplay();
}

function handleACButton() {
    display = 0;
    inputArray = '';
}

function handleSquareButton() {
    if (inputArray === '') return;
    inputArray += '**2';
    handleEqualsButton();
}

function handleRootButton() {
    inputArray += '√';
    updateDisplay();
}

function handleEqualsButton() {
    if (inputArray === '') return;
    console.log(inputArray);
    inputArray = evaluateExpression(inputArray).toString();
    updateDisplay();
}

function updateDisplay() {
    if (inputArray.includes('/100*')) {
    display = inputArray.replace('/100*', '%');
} else {
    display = inputArray;
}
}

function evaluateExpression(str) {
    return Function(`'use strict'; return (${str})`)();
}