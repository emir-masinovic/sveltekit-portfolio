<script>
	import Button from './Button.svelte';

	export let title, imageSource, bodyContent, buttonText, buttonLink;
</script>

<div class="card-container">
	<div class="card-head">
		<a href={buttonLink} class="button">
			<img src={imageSource} alt="" class="img-card" />
		</a>
	</div>
	<div class="card-body">
		<h2>{title}</h2>
		<p>{bodyContent}</p>
	</div>
	<div class="card-footer">
		<Button text={buttonText} {buttonLink} />
	</div>
</div>

<style>
	:root {
		--card-background: #343a40;
	}
	:global(.light-theme) {
		--card-background: #ebd8c3;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 300px;
		background: var(--card-background);
		border: 1px solid black;
		transition: background-color var(--transition-time);
		font-size: 1.6rem;
	}

	.card-head {
		height: 200px;
	}

	.img-card {
		width: 100%;
		height: 100%;
	}

	.card-body {
		height: 100px;
		padding: 5px 10px;
		border-top: 1px solid black;
	}

	.card-footer {
		display: flex;
		padding: 10px;
	}

	@media (min-width: 1600px) {
		.card-body {
			height: 200px;
		}
	}
</style>
