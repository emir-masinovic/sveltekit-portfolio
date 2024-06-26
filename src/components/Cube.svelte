<script>
	import { onMount } from 'svelte';

	let cubeDiv;
	let cubeProperties = { x: 0, y: 0, xSpeed: 0, ySpeed: 0 };
	let intervalId = null;
	const intervalDelay = 10;
	const speedAddRemove = 0.2;

	// Svelte has problems if adding events before page loads
	onMount(() => {
		rotate('right');
		rotate('up');
		slowDown();
		window.addEventListener('keydown', handleKeyPress);

		function handleKeyPress(event) {
			let key;

			// Handle cases where letters are pressed, instead of arrows or numbers
			if (/^[a-zA-Z]$/.test(event.key)) {
				// Convert letter keys to lowercase
				key = event.key.toLowerCase();
			} else {
				// Keep non-letter keys as is
				key = event.key;
			}

			switch (key) {
				case 'ArrowUp':
				case 'w':
				case '8':
					rotate('up');
					break;
				case 'ArrowDown':
				case 's':
				case '2':
					rotate('down');
					break;
				case 'ArrowLeft':
				case 'a':
				case '4':
					rotate('left');
					break;
				case 'ArrowRight':
				case 'd':
				case '6':
					rotate('right');
					break;
				case '+':
					speedUp();
					break;
				case '-':
					slowDown();
					break;
				case ' ':
				case '5':
					pauseResume();
					break;
				case 'r':
					reset();
					break;
				case 't':
					randomize();
					break;
				default:
					break;
			}
		}
	});

	function normalizeRotation(degrees) {
		return ((degrees % 360) + 360) % 360;
	}

	function rotateCube() {
		if (intervalId !== null) clearInterval(intervalId);

		intervalId = setInterval(function () {
			cubeProperties.x += cubeProperties.ySpeed * 360 * (intervalDelay / 1000);
			cubeProperties.y += cubeProperties.xSpeed * 360 * (intervalDelay / 1000);

			cubeProperties.x = normalizeRotation(cubeProperties.x);
			cubeProperties.y = normalizeRotation(cubeProperties.y);

			try {
				cubeDiv.style.transform = `rotateX(${cubeProperties.x}deg) rotateY(${cubeProperties.y}deg)`;
			} catch (error) {
				// console.error('Error setting cube transform:', error);
			}
		}, intervalDelay);
	}

	function rotate(direction) {
		if (direction === 'left' || direction === 'right') {
			cubeProperties.xSpeed += (direction === 'left' ? -1 : 1) * speedAddRemove;
		}
		if (direction === 'up' || direction === 'down') {
			cubeProperties.ySpeed -= (direction === 'up' ? -1 : 1) * speedAddRemove;
		}
		rotateCube();
	}

	function pauseResume() {
		if (intervalId !== null) {
			clearInterval(intervalId);
			intervalId = null;
		} else {
			rotateCube();
		}
	}

	function speedUp() {
		cubeProperties.xSpeed *= 2;
		cubeProperties.ySpeed *= 2;
		rotateCube();
	}

	function slowDown() {
		cubeProperties.xSpeed /= 2;
		cubeProperties.ySpeed /= 2;
		rotateCube();
	}

	function randomize() {
		const sides = cubeDiv.querySelectorAll('div');
		sides.forEach((side) => {
			side.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
			side.style.opacity = '0.5';
		});
	}

	function reset() {
		cubeProperties.xSpeed = 0;
		cubeProperties.ySpeed = 0;
		cubeProperties.x = 0;
		cubeProperties.y = 0;
		rotateCube();
	}
</script>

<div class="cube" bind:this={cubeDiv}>
	<div class="top" />
	<div class="right" />
	<div class="bottom" />
	<div class="left" />
	<div class="front" />
	<div class="back" />
</div>

<div class="info">
	<p>RotX: {cubeProperties.xSpeed.toFixed(2)}</p>
	<p>RotY: {cubeProperties.ySpeed.toFixed(2)}</p>
</div>

<div class="buttons">
	<button on:click={() => rotate('up')}>w &uarr;</button>
	<button on:click={() => rotate('left')}>&larr; a</button>
	<button on:click={() => rotate('right')}>d &rarr;</button>
	<button on:click={() => rotate('down')}>s &darr;</button>
	<button on:click={slowDown}>≪ -</button>
	<button on:click={pauseResume}>| |</button>
	<button on:click={speedUp}>+ ≫</button>
	<button on:click={randomize}>🎲 T<br /> </button>
	<button on:click={reset}>↻</button>
</div>

<style>
	:root {
		--buttons-background: #343a40;
		--buttons-hover: rgba(177, 177, 177, 0.5);
	}

	:global(.light-theme) {
		--buttons-background: #ebd8c3;
		--buttons-hover: rgba(73, 71, 71, 0.5);
	}

	.buttons {
		display: grid;
		grid-template-areas:
			'up up up up up'
			'left left . right right'
			'down down down down down'
			'. . . . .'
			'slowDown slowDown stop speedUp speedUp'
			'randomize randomize randomize reset reset';
		gap: 10px;
		justify-content: center;
	}

	.buttons button {
		border: 1px solid black;
		color: var(--text);
		padding: 8px;
		background-color: var(--buttons-background);
		transition: var(--transition-time);
		font-size: 2rem;
	}

	.buttons button:hover {
		background-color: var(--buttons-hover);
		color: var(--buttons-background);
		transition-duration: 0.3s;
	}

	.info {
		padding: 0 0 20px 0;
	}

	.buttons > button:nth-child(1) {
		grid-area: up;
	}

	.buttons > button:nth-child(2) {
		grid-area: left;
	}

	.buttons > button:nth-child(3) {
		grid-area: right;
	}

	.buttons > button:nth-child(4) {
		grid-area: down;
	}

	.buttons > button:nth-child(5) {
		grid-area: slowDown;
	}

	.buttons > button:nth-child(6) {
		grid-area: stop;
	}

	.buttons > button:nth-child(7) {
		grid-area: speedUp;
	}

	.buttons > button:nth-child(8) {
		grid-area: randomize;
	}

	.buttons > button:nth-child(9) {
		grid-area: reset;
	}

	.cube {
		--cube-size: 100px;
		--cube-side: 50px;
		transform-style: preserve-3d;
		position: relative;
		width: var(--cube-size);
		height: var(--cube-size);
		margin: 50px auto;
	}

	.cube div {
		width: var(--cube-size);
		height: var(--cube-size);
		line-height: var(--cube-size);
		text-align: center;
		box-shadow: inset 0 0 0 1px rgba(10, 0, 0, 0.8);
		display: block;
		position: absolute;
	}

	.cube div.top {
		transform: rotateX(90deg);
		margin-top: calc(-1 * var(--cube-side));
		background: rgba(0, 255, 0, 0.5);
	}

	.cube div.right {
		transform: rotateY(90deg);
		margin-left: var(--cube-side);
		background: rgba(0, 255, 255, 0.5);
	}

	.cube div.bottom {
		transform: rotateX(-90deg);
		margin-top: var(--cube-side);
		background: rgba(255, 0, 0, 0.5);
	}

	.cube div.left {
		transform: rotateY(-90deg);
		margin-left: calc(-1 * var(--cube-side));
		background: rgba(125, 0, 255, 0.5);
	}

	.cube div.front {
		transform: translateZ(var(--cube-side));
		background: rgba(255, 125, 0, 0.5);
	}

	.cube div.back {
		transform: translateZ(calc(-1 * var(--cube-side))) rotateX(180deg);
		background: rgba(255, 125, 125, 0.5);
	}

	@media (min-width: 600px) {
		.buttons button {
			font-size: 1.6rem;
		}
	}
</style>
