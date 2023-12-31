<script>
	import emir from '../images/emir.jpg';
	import Cube from '../components/Cube.svelte';
</script>

<div class="home-container">
	<div class="home-item">
		<h1>Emir Masinovic</h1>
		<p>Web Dev and computer graphics enthusiast</p>
		<br />
		<img src={emir} alt="" class="profile-picture" />
	</div>
	<div class="home-item">
		<img
			src="https://readme-typing-svg.demolab.com?font=Poppins&size=20	&duration=3000&pause=1000&color=944CF7&center=true&random=false&width=320&lines=Spin+that+cube!;Rotate+with+WASD;or+the+arrow+keys.;Double+speed+%3A+%2B;Halve+speed%3A+-;Reset%3A+R;Pause%3A+space;Random+colors%3A+T"
			alt="Typing SVG"
			class="svg-text"
		/>
		<Cube />
	</div>
</div>

<style>
	.home-container {
		display: flex;
		flex-direction: column;
		padding: 20px;
		gap: 40px;
		text-align: center;
	}

	.profile-picture {
		border-radius: 100%;
		width: 80%;
	}

	.svg-text {
		margin-bottom: -20px;
	}

	@media (min-width: 600px) {
		.home-container {
			flex-direction: row;
			height: calc(100vh - 80px);
			align-items: center;
			justify-content: center;
			gap: 0;
		}
		.profile-picture {
			width: clamp(200px, 70%, 450px);
		}
	}
	@media (min-width: 1200px) {
		.home-item {
			width: 40%;
		}
	}
</style>
