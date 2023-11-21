<script>
	const buttons = [
		{ text: 'AC', className: 'btn-clear' },
		{ text: '√', className: 'btn-operation' },
		{ text: 'x²', className: 'btn-operation' },
		{ text: '%', className: 'btn-operation' },
		{ text: '7', className: 'btn-number' },
		{ text: '8', className: 'btn-number' },
		{ text: '9', className: 'btn-number' },
		{ text: '÷', className: 'btn-operation' },
		{ text: '4', className: 'btn-number' },
		{ text: '5', className: 'btn-number' },
		{ text: '6', className: 'btn-number' },
		{ text: '×', className: 'btn-operation' },
		{ text: '1', className: 'btn-number' },
		{ text: '2', className: 'btn-number' },
		{ text: '3', className: 'btn-number' },
		{ text: '-', className: 'btn-operation' },
		{ text: '0', className: 'btn-number' },
		{ text: '.', className: 'btn-number' },
		{ text: '=', className: 'btn-equals' },
		{ text: '+', className: 'btn-operation' }
	];

	let inputArray = '';
	let display = '0';

	function handleButton(event) {
		const pressedButton = event.target.innerText;

		// Case 1: Pressing 0 continuously. Don't add zeros
		if (inputArray === '' && pressedButton === '0') return;

		// Case 2: Switching operations. Leave last one
		if (inputArray === '' && ['+', '-', '×', '÷'].includes(pressedButton)) {
			inputArray = '0' + pressedButton;
			display = inputArray;
			return;
		}

		// Case 3: When there are two operations next to each other
		const lastChar = inputArray.charAt(inputArray.length - 1);
		if (['+', '-', '×', '÷'].includes(lastChar) && ['+', '-', '×', '÷'].includes(pressedButton)) {
			// Replace the last operator with the new one
			inputArray = inputArray.slice(0, -1) + pressedButton;
			display = inputArray;
			return;
		}

		switch (pressedButton) {
			case 'AC':
				display = '0';
				inputArray = '';
				break;
			case '=':
				handleEqualsButton();
				break;
			case '×':
				display += pressedButton;
				inputArray += '*';
				break;
			case '÷':
				display += pressedButton;
				inputArray += '/';
				break;
			case 'x²':
				if (display === '0') {
					display += `²`;
					inputArray = '0**2';
				} else {
					display += `²`;
					inputArray += '**2';
				}

				break;
			case '√':
				if (display === '0') {
					display = pressedButton;
				} else {
					display += pressedButton;
					// inputArray = pressedButton + '**(1/2)';
					inputArray = display.replace('√', '**(1/2)');
					console.log(inputArray);
				}
				break;
			case '%':
				// display += pressedButton;
				// inputArray += '/100*';

				if (display === '0') {
					display = pressedButton;
					inputArray = '';
				} else {
					display += pressedButton;
					inputArray += '/100*';
				}
				break;
			default:
				inputArray += pressedButton;
				if (display === '0' || display === 'ERROR') {
					display = pressedButton;
				} else {
					display += pressedButton;
				}
				break;
		}
	}

	function handleEqualsButton() {
		console.log('Trying to compute: ', inputArray);
		try {
			inputArray = Function(`'use strict'; return (${inputArray})`)().toString();
			display = inputArray;
			console.log('Inside try block: ', inputArray);
		} catch (err) {
			inputArray = '';
			display = 'ERROR';
			console.log('Inside error block: ', err.message);
		}
	}
</script>

<div class="calculator-container">
	<div class="calculator-header">
		<div>CASIO</div>
		<div class="casio-black" />
	</div>
	<div class="calculator-body">
		<div class="display">{display}</div>
	</div>
	<div class="calculator-footer">
		<div class="buttons-container">
			{#each buttons as { text, className }}
				<button class={className} on:pointerdown={handleButton}>{text}</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.calculator-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		padding: 20px;
		background-color: rgb(128, 128, 128);
		display: flex;
		flex-direction: column;
		gap: 10px;
		box-shadow: rgba(0, 0, 0, 0.1) 0 -23px 25px 0 inset, rgba(0, 0, 0, 0.15) 0 -36px 30px 0 inset,
			rgba(0, 0, 0, 0.1) 0 -79px 40px 0 inset, rgba(0, 0, 0, 0.06) 0 2px 1px,
			rgba(0, 0, 0, 0.09) 0 4px 2px, rgba(0, 0, 0, 0.09) 0 8px 4px, rgba(0, 0, 0, 0.09) 0 16px 8px,
			rgba(0, 0, 0, 0.09) 0 32px 16px;
		font-size: 3.5rem;
	}

	.calculator-header {
		display: flex;
		justify-content: space-between;
	}

	.casio-black {
		width: 30%;
		background: rgba(0, 0, 0, 0.7);
	}

	.display {
		padding: 5px;
		background-color: #a2bbcf;
		text-align: right;
		box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.5);
		overflow: hidden;
		word-wrap: break-word;
	}

	.buttons-container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: repeat(4, 1fr);
		padding: 10px;
		gap: 8px;
	}

	.buttons-container button {
		height: 60px;
		/*padding: 5px;*/
		color: rgba(255, 255, 255, 0.8);
		background-color: rgba(0, 0, 0, 0.7);
		border: none;
		user-select: none;
		cursor: pointer;
		text-align: center;
		font-size: 2.5rem;
		font-family: 'Poppins', sans-serif;
		box-shadow: rgba(0, 0, 0, 0.25) 0 3px 5px, rgba(0, 0, 0, 0.22) 0 3px 3px;
	}

	.buttons-container button:active {
		background-color: rgba(0, 0, 0, 0.5);
	}

	@media (min-width: 576px) {
		.calculator-container {
			width: 500px;
			/*font-size: 2rem;*/
		}

		/*.buttons-container button {*/
		/*}*/
	}
</style>
