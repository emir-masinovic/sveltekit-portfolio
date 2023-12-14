<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<Navbar />
<slot />

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

	:root {
		--background: #464e56;
		--text: #fff;
		--border: black;
		--transition-time: 1s;
		font-size: 62.5%;
	}

	:global(.light-theme) {
		--background: #fff6ea;
		--text: rgba(0, 0, 0, 0.9);
	}

	:global(body) {
		width: 100%;
		/*height: calc(100vh);*/
		/*overflow: hidden;*/
		background-color: var(--background);
		transition: var(--transition-time);
		color: var(--text);

		font-size: 1.6rem;
	}
</style>
