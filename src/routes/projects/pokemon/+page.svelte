<script>
	import pokemonTitle from '../../../images/pokemon_title.png';

	let pokemon = [];
	let currentPageUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';
	let nextPageUrl;
	let prevPageUrl;
	let loading = true;

	async function fetchData(url) {
		try {
			const response = await fetch(url);
			const data = await response.json();
			setPokemon(data.results.map((p) => p.name));
			setNextPageUrl(data.next);
			setPrevPageUrl(data.previous);
			loading = false;
		} catch (error) {
			console.error(error);
			loading = false;
		}
	}

	async function loadPage(url) {
		loading = true;
		await fetchData(url);
	}

	// Initial data fetching
	loadPage(currentPageUrl);

	function setNextPageUrl(url) {
		nextPageUrl = url;
	}

	function setPrevPageUrl(url) {
		prevPageUrl = url;
	}

	function setPokemon(data) {
		pokemon = data;
	}

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
	}
</script>

{#if loading}
	<div class="spinner" />
{:else}
	<div class="pokemon-card">
		<img src={pokemonTitle} alt="" />

		<div class="pokemon-card-body">
			{#each pokemon as p (p)}
				<div class="pokemon-card-body-div">{capitalize(p)}</div>
			{/each}
		</div>
		<div class="pokemon-card-buttons">
			{#if prevPageUrl !== null}
				<button on:click={() => loadPage(prevPageUrl)}>Previous</button>
			{/if}
			{#if nextPageUrl !== null}
				<button on:click={() => loadPage(nextPageUrl)}>Next</button>
			{/if}
		</div>
	</div>
{/if}

<style>
	@import url('https://fonts.cdnfonts.com/css/pokemon-solid');

	.spinner {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 80px;
		height: 80px;
		border: 8px solid;
		border-color: #3d5af1 transparent #3d5af1 transparent;
		border-radius: 50%;
		animation: spin-it 2s linear infinite;
	}

	@keyframes spin-it {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.pokemon-card {
		--border-pokemon: #0a285f;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: fit-content;
		height: fit-content;
		padding: 10px;
		border: 10px solid var(--border-pokemon);
		background-color: #ffcc00;
		border-radius: 15px;
		color: black;
		box-shadow: -10px 10px 0 rgba(0, 0, 0, 0.5);
		font-size: 2rem;
	}

	.pokemon-card img {
		padding: 2px;
		height: 100px;
		border-bottom: 2px solid var(--border-pokemon);
	}

	.pokemon-card-body-div {
		padding: 5px 0;
		height: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Pokemon Solid', sans-serif;
		font-weight: bold;
	}

	.pokemon-card-buttons {
		margin: 10px auto;
		display: flex;
		gap: 10px;
		justify-content: center;
		align-content: center;
	}

	.pokemon-card-buttons button {
		font-family: 'Pokemon Solid', sans-serif;
		background: #d5a100;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 5px;
		border: 2px solid var(--border-pokemon);
		border-radius: 8px;
		width: 100px;
		height: 40px;
		cursor: pointer;
		transition: 0.5s;
		box-shadow: -2px 2px 0 black;
		user-select: none;
		font-size: 2rem;
	}

	.pokemon-card-buttons button:hover {
		background-color: var(--border-pokemon);
		color: #ffcc00;
		transform: scale(0.98);
	}

	/*@media (max-width: 576px) {*/
	/*	.pokemon-card {*/
	/*		width: 80%;*/
	/*	}*/
	/*}*/
</style>
