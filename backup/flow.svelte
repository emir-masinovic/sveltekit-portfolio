<script>
	let ripples = 1;
	let flowSpeed = 0;
	let color1 = 'red';
	let color2 = 'blue';

	let colorArr = '';

	addRipple();

	let mouseX = 50;
	let mouseY = 50;

	function mouseMoveChangeColor(event) {
		const centerX = window.innerWidth / 2;
		const centerY = (window.innerHeight - 160) / 2;

		const deltaX = (event.clientX - centerX) / window.innerWidth;
		const deltaY = (event.clientY - centerY) / (window.innerHeight - 80);

		mouseX = 50 + deltaX * 50;
		mouseY = 50 + deltaY * 50;

		const red = Math.floor(255 * (1 - mouseX / 100));
		const blue = Math.floor(255 * (1 - mouseY / 100));

		colorArr = '';

		const color1 = `rgb(${red}, 0, ${blue})`;
		const color2 = `rgb(0, ${red}, ${blue})`;

		colorArr = `${color1}, ${color2}`;

		for (let i = 0; i < ripples; i++) {
			colorArr = colorArr + color1 + ', ' + color2 + ', ';
			if (i + 1 === ripples) {
				colorArr = colorArr.slice(0, -2);
			}
		}

		// console.log(colorArr);
		// console.log(`${mouseX}% ${mouseY}%`);
	}

	function addRipple() {
		colorArr = '';
		ripples++;

		for (let i = 0; i < ripples; i++) {
			colorArr = colorArr + color1 + ', ' + color2 + ', ';
			if (i + 1 === ripples) {
				colorArr = colorArr.slice(0, -2);
			}
		}
		requestAnimationFrame(addRipple);
	}

	// Flow the background using flowSpeed
	function flowBackground() {
		const element = document.querySelector('.flow');
		const currentBackgroundPosition = element.style.backgroundPosition;

		// Calculate the new background position based on flowSpeed
		const newX = (parseFloat(currentBackgroundPosition.split(' ')[0]) + flowSpeed) / 100000;
		const newY = (parseFloat(currentBackgroundPosition.split(' ')[1]) + flowSpeed) / 100;

		// Set the new background position
		element.style.backgroundPosition = `${newX}% ${newY}%`;

		// Request the next animation frame
		requestAnimationFrame(flowBackground);
	}

	// Start the flow animation
	requestAnimationFrame(flowBackground);
</script>

<div
	class="flow"
	style="background: radial-gradient(circle at center, {colorArr});"
	on:mousemove={mouseMoveChangeColor}
	on:click={addRipple}
/>

<style>
	.flow {
		width: 100%;
		height: calc(100vh - 80px);
	}
</style>
