<script>
	import Card from '../../components/Card.svelte';
	import calculator from '../../images/calculator.jpg';
	import clock from '../../images/clock.jpg';
	import clicker from '../../images/clicker.jpg';
	import feedback from '../../images/feedback.jpg';
	import parallax from '../../images/parallax.jpg';
	import pokemon from '../../images/pokemon.jpg';
	import flow from '../../images/flow.jpg';
	import ttt from '../../images/ttt.jpg';
	import babylon from '../../images/babylon.jpg';
</script>

<div class="project-container">
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
	<Card
		title="Clicker"
		imageSource={clicker}
		bodyContent="Clickity-clack!"
		buttonText="Play"
		buttonLink="/projects/clicker"
	/>
	<Card
		title="Feedback Ratings"
		imageSource={feedback}
		bodyContent="Rate a movie!"
		buttonText="Link"
		buttonLink="/projects/ratings"
	/>
	<Card
		title="Parallax Effect"
		imageSource={parallax}
		bodyContent="Illusion of depth"
		buttonText="Link"
		buttonLink="/parallax-effect/parallax.html"
	/>
	<Card
		title="Pokemon"
		imageSource={pokemon}
		bodyContent="Pokedex, but without images"
		buttonText="Link"
		buttonLink="/projects/pokemon"
	/>
	<Card
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
	/>

	<Card
		title="Babylon"
		imageSource={babylon}
		bodyContent="Work in progress"
		buttonText="Play"
		buttonLink="/projects/babylonium"
	/>
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
