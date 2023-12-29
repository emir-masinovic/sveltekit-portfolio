<script>
	import { onMount } from 'svelte';

	let clock, hour, minute, second;
	let intervalId;

	onMount(() => {
		const deg = 6;
		const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
		const chooseShortWindowSide = Math.min(window.innerWidth, window.innerHeight) - remValue;

		clock.style.height = chooseShortWindowSide - 2 * remValue - 80 + 'px';
		clock.style.width = chooseShortWindowSide - 2 * remValue - 80 + 'px';

		hour.style.height = clock.offsetWidth / 4 + 'px';
		hour.style.width = 8 + 'px';
		minute.style.height = clock.offsetWidth / 2.5 + 'px';
		minute.style.width = 6 + 'px';
		second.style.height = clock.offsetWidth / 2 - 8 + 'px';
		second.style.width = 4 + 'px';

		intervalId = setInterval(() => {
			const date = new Date();
			const hourDate = date.getHours() * 30;
			const minuteDate = date.getMinutes() * deg;
			const secondDate = date.getSeconds() * deg;

			hour.style.transform = `rotateZ(${hourDate + minuteDate / 12}deg)`;
			minute.style.transform = `rotateZ(${minuteDate}deg)`;
			second.style.transform = `rotateZ(${secondDate}deg)`;
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	});
</script>

<div class="clock-container">
	<div class="clock" bind:this={clock}>
		<div class="center" />
		<div class="hour" bind:this={hour} />
		<div class="minute" bind:this={minute} />
		<div class="second" bind:this={second} />
		<div class="mark-12 mark" />
		<div class="mark-3 mark" />
		<div class="mark-6 mark" />
		<div class="mark-9 mark" />
	</div>
</div>

<style>
	:root {
		--clock-background: #343a40;
		--clock-hour-lines: #464e56;
	}

	:global(.light-theme) {
		--clock-background: #ebd8c3;
		--clock-hour-lines: #fff6ea;
	}

	.clock-container {
		height: calc(100vh - 80px);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clock {
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border: 1px solid var(--border);
		background-color: var(--clock-background);
		border-radius: 50%;
	}

	.center {
		position: absolute;
		width: 20px;
		height: 20px;
		background-color: var(--background);
		border: 1px solid var(--border);
		border-radius: 50%;
		z-index: 10;
	}

	.hour,
	.minute,
	.second {
		position: absolute;
		z-index: 2;
		top: 50%;
		rotate: 180deg;
		-webkit-transform-origin: top;
		-ms-transform-origin: top;
		transform-origin: top;
		background-color: var(--clock-hour-lines);
		border-radius: 0 0 5px 5px;
		border: 1px solid var(--border);
		transition: 1s;
	}

	.mark {
		position: absolute;
		height: 30px;
		width: 8px;
		margin: 2px;
		background-color: var(--clock-hour-lines);
		border: 1px solid var(--border);
		/*z-index: 0;*/
	}

	.mark-12 {
		top: 0;
	}

	.mark-3 {
		right: 0;
		transform: rotate(90deg);
		margin: 14px;
	}

	.mark-6 {
		bottom: 0;
	}

	.mark-9 {
		left: 0;
		transform: rotate(90deg);
		margin: 14px;
	}
</style>
