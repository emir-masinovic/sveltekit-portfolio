<script>
	import emir from '../images/emir.jpg';
	import Cube from '../components/Cube.svelte';
</script>

<div class="home-container">
	<div class="home-item"><img src={emir} alt="" class="img-fluid" /></div>
	<div class="home-item">
		<h1>Emir Masinovic</h1>
		<p>I'm working on combining website development and computer graphics.</p>
		<Cube />
	</div>
</div>

<style>
	.home-container {
		display: flex;
		flex-direction: column;
		padding: 20px;
		gap: 20px;
		text-align: center;
	}

	.img-fluid {
		border-radius: 100%;
		width: 80%;
	}

	@media (min-width: 600px) {
		.home-container {
			flex-direction: row;
			height: calc(100vh - 80px);
			align-items: center;
			justify-content: center;
			gap: 0;
		}
		.home-item {
			width: 40%;
		}
		.img-fluid {
			width: clamp(200px, 70%, 450px);
		}
	}
</style>
