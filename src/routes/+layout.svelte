<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />

<div class="container">
	<slot />
</div>

<style>
	/*@import "../css/breakpoint.css";*/
	@import url('https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Poppins:wght@300&display=swap');

	:global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-weight: 400;
		font-family: 'Poppins', sans-serif;
	}

	:global(*):focus {
		outline: 3px dashed #007bff;
		outline-offset: 3px;
	}

	:root {
		--background: #464e56;
		--text: #fff;
		--border: black;
		--transition-time: 0.6s;
		font-size: 62.5%;

		--page-display: initial;
	}

	:global(.light-theme) {
		--background: #fff6ea;
		--text: rgba(0, 0, 0, 0.9);
	}

	:global(body) {
		background-color: var(--background);
		transition: var(--transition-time);
		color: var(--text);
		font-size: 1.6rem;
	}

	:global(.menu-active) {
		/* Hides dvh when URL visible on phones */
		/* But also casues page to go back to top */
		--page-display: none;
	}

	.container {
		display: var(--page-display);
	}
	@media (min-width: 700px) {
		.container {
			display: initial;
		}
	}
</style>
