<div class="calculator-container">
    <div class="calculator-header">
        <div>CASIO</div>
        <div class="casio-black"></div>
    </div>
    <div class="calculator-body">
        <div class="display">0</div>
    </div>
    <div class="calculator-footer">
        <div class="buttons-container"></div>
    </div>
</div>

<script>
    import {onMount} from 'svelte';

    const buttons = [
        {text: "AC", className: "btn-clear"},
        {text: "√", className: "btn-operation"},
        {text: "x²", className: "btn-operation"},
        {text: "%", className: "btn-operation"},
        {text: "7", className: "btn-number"},
        {text: "8", className: "btn-number"},
        {text: "9", className: "btn-number"},
        {text: "/", className: "btn-operation"},
        {text: "4", className: "btn-number"},
        {text: "5", className: "btn-number"},
        {text: "6", className: "btn-number"},
        {text: "*", className: "btn-operation"},
        {text: "1", className: "btn-number"},
        {text: "2", className: "btn-number"},
        {text: "3", className: "btn-number"},
        {text: "-", className: "btn-operation"},
        {text: "0", className: "btn-number"},
        {text: ".", className: "btn-number"},
        {text: "=", className: "btn-equals"},
        {text: "+", className: "btn-operation"},
    ];

    let inputArray = "";
    let display;

    onMount(() => {
        display = document.querySelector(".display");
    });

    function handleButtonClick(event) {
        event.preventDefault();

        const pressedButton = event.target.innerText;
        switch (pressedButton) {
            case "AC":
                handleACButton();
                break;
            case "=":
                handleEqualsButton();
                break;
            case "x²":
                handleSquareButton();
                break;
            case "√":
                handleRootButton();
                break;
            case "%":
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
        inputArray += "/100*";
        updateDisplay();
    }

    function handleACButton() {
        display.textContent = "0";
        inputArray = "";
    }

    function handleSquareButton() {
        inputArray += "**2";
        handleEqualsButton();
    }

    function handleRootButton() {
        const regex = /-/g;
        const matches = inputArray.match(regex);

        if (matches && matches.includes("-")) {
            inputArray = "ERROR";
        } else {
            inputArray += "**(1/2)";
        }

        updateDisplay();
        handleEqualsButton();
    }

    function handleEqualsButton() {
        if (inputArray === "") return;
        const result = evaluateExpression(inputArray);
        inputArray = result.toString(); // Assign the evaluated result back to inputArray
        updateDisplay();
    }

    function updateDisplay() {
        if (inputArray.includes("/100*")) {
            display.textContent = inputArray.replace("/100*", "%");
        } else {
            display.textContent = inputArray;
        }
    }

    function evaluateExpression(str) {
        return Function(`'use strict'; return (${str})`)();
    }
</script>


<style>

    .calculator-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        padding: 1rem;
        background-color: gray;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-shadow: rgba(0, 0, 0, 0.1) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
        rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }

    .calculator-header {
        display: flex;
        justify-content: space-between;
        font-size: 2.5rem;
    }

    .casio-black {
        width: 30%;
        background: rgba(0, 0, 0, 0.7);
    }

    .display {
        padding: 0.5rem;
        background-color: #a2bbcf;
        text-align: right;
        font-size: 2rem;
        box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.5);
    }

    .buttons-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        padding: 0.2rem;
        gap: 0.5rem;
    }

    .buttons-container button {
        height: 4rem;
        padding: 0.5rem;
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(0, 0, 0, 0.7);
        border: none;
        user-select: none;
        cursor: pointer;
        text-align: center;
        font-size: 1.5rem;
        font-family: 'Poppins', sans-serif;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 3px 5px, rgba(0, 0, 0, 0.22) 0px 3px 3px;
    }

    .buttons-container button:active {
        background-color: rgba(0, 0, 0, 0.5);
    }

    @media (min-width: 576px) {
        .calculator-container {
            width: 500px;
            font-size: 2rem;
        }

        .buttons-container button {
            height: 4rem;
            font-size: 1.5rem;
        }
    }
</style>
