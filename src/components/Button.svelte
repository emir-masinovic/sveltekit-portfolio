<script>
	export let text, buttonLink;
</script>

<a href={buttonLink} class="button">{text}</a>

<style>
	:root {
		--button-shadow: black;
	}

	:global(.light-theme) {
		--button-shadow: rgb(128, 128, 128);
	}

	.button {
		padding: 6px;
		text-decoration: none;
		font-size: 1.8rem;
		color: var(--text);
		background: var(--background);
		border: 1px solid var(--border);
		transition: 0.5s;
	}

	.button:hover {
		color: var(--navbar);
		background-color: var(--text);
		box-shadow: -4px 4px var(--button-shadow);
		transform: translate(5px, -5px);
	}
</style>
