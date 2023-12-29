<script>
	export let text, buttonLink;
</script>

<a href={buttonLink} class="button">{text}</a>

<style>
	:root {
		--button-background: #464e56;
		--button-shadow: black;
	}

	:global(.light-theme) {
		--button-background: #fff6ea;
		--button-shadow: rgb(128, 128, 128);
	}

	.button {
		padding: 6px;
		text-decoration: none;
		font-size: 1.8rem;
		color: var(--text);
		background: var(--button-background);
		border: 1px solid var(--border);
		transition: 0.5s;
	}

	.button:hover {
		color: var(--button-background);
		background-color: var(--text);
		box-shadow: -4px 4px var(--button-shadow);
		transform: translate(5px, -5px);
	}
</style>
