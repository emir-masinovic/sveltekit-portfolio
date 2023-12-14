<script>
	import Card from '../../components/Card.svelte';
	import babylon from '../../images/babylon.jpg';
	import calculator from '../../images/calculator.jpg';
	import clock from '../../images/clock.jpg';
	// import clicker from '../../images/clicker.jpg';
	import movieRatings from '../../images/movieRatings.jpg';
	import pokemon from '../../images/pokemon.jpg';
	// import flow from '../../images/flow.jpg';
	// import ttt from '../../images/ttt.jpg';
</script>

<div class="project-container">
	<Card
		title="Go Cube"
		imageSource={babylon}
		bodyContent="3D graphics with Babylonjs"
		buttonText="Play"
		buttonLink="/projects/babylonium"
	/>

	<Card
		title="Calculator"
		imageSource={calculator}
		bodyContent=""
		buttonText="Link"
		buttonLink="/projects/calculator"
	/>
	<Card
		title="Clock"
		imageSource={clock}
		bodyContent=""
		buttonText="Link"
		buttonLink="/projects/clock"
	/>
	<!-- <Card
		title="Clicker"
		imageSource={clicker}
		bodyContent="Clickity-clack!"
		buttonText="Play"
		buttonLink="/projects/clicker"
	/> -->
	<Card
		title="Movie Ratings"
		imageSource={movieRatings}
		bodyContent=""
		buttonText="Link"
		buttonLink="/projects/ratings"
	/>
	<Card
		title="Pokedex"
		imageSource={pokemon}
		bodyContent=""
		buttonText="Link"
		buttonLink="/projects/pokemon"
	/>
	<!-- <Card
		title="FLOW"
		imageSource={flow}
		bodyContent="Background flow"
		buttonText="Link"
		buttonLink="/projects/flow"
	/>
	<Card
		title="Tic Tac Toe"
		imageSource={ttt}
		bodyContent="Work in progress"
		buttonText="Play"
		buttonLink="/projects/tictactoe"
	/> -->
</div>

<style>
	.project-container {
		display: flex;
		/*height: calc(100vh - 100px);*/
		justify-content: center;
		align-items: center;
		gap: 10px;
		padding: 10px;
		flex-wrap: wrap;
	}
</style>
