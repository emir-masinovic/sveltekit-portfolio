<script>
	import { onMount } from 'svelte';

	const minimumCharacters = 5;
	let ratingsArray = [];
	let input = '';
	let userRating = 0;
	$: isButtonDisabled = input.length < minimumCharacters;
	$: averageRatings = calculateAverageRatings(ratingsArray);

	onMount(() => {
		const storedRatings = localStorage.getItem('ratingsArray');
		if (storedRatings) {
			ratingsArray = JSON.parse(storedRatings);
		}
	});

	function submitReview(event) {
		event.preventDefault();
		if (input.length >= minimumCharacters) {
			const maxId =
				ratingsArray.reduce((max, rating) => (rating.id > max ? rating.id : max), 0) + 1;
			let newRating = { id: maxId, rating: userRating, text: input, fadeIn: true };
			ratingsArray.forEach((rating) => (rating.fadeIn = false));
			ratingsArray = [newRating, ...ratingsArray];
			input = '';
			userRating = 0;
			localStorage.setItem('ratingsArray', JSON.stringify(ratingsArray));
			setTimeout(() => {
				newRating.fadeIn = false;
				localStorage.setItem('ratingsArray', JSON.stringify(ratingsArray));
			}, 2000);
		}
	}

	function calculateAverageRatings(array) {
		if (array.length > 0) {
			const totalRatings = array.reduce((total, rating) => total + rating.rating, 0);
			return (totalRatings / array.length).toFixed(2);
		} else {
			return 0;
		}
	}

	function deleteRating(event) {
		const idToDelete = parseInt(event.target.value);
		ratingsArray = ratingsArray.map((rating) => {
			if (rating.id === idToDelete) {
				rating.fadeOut = true;
			}
			return rating;
		});
		setTimeout(() => {
			ratingsArray = ratingsArray.filter((rating) => rating.id !== idToDelete);
			localStorage.setItem('ratingsArray', JSON.stringify(ratingsArray));
		}, 1000);
	}

	// let averageRatings = 0;
	// afterUpdate(() => {
	//     calculateAverageRatings();
	// });
	// function calculateAverageRatings() {
	//     if (ratingsArray.length > 0) {
	//         const totalRatings = ratingsArray.reduce((total, rating) => total + rating.rating, 0);
	//         return (totalRatings / ratingsArray.length).toFixed(2);
	//     } else {
	//         return 0;
	//     }
	// }
</script>

<div class="ratings-container">
	<div class="ratings-header">
		<h2>Rate our service</h2>
		<form class="ratings-form">
			<ul class="ratings-form-list">
				{#each Array.from({ length: 10 }) as _, i}
					<li>
						<input type="radio" id={`radio ${1 + i}`} bind:group={userRating} value={1 + i} />
						<label for={`radio ${1 + i}`}>{1 + i}</label>
					</li>
				{/each}
			</ul>
			<div class="ratings-form-group">
				<input
					type="text"
					placeholder="Rate away"
					on:input={(event) => (input = event.target.value)}
					bind:value={input}
				/>
				<button type="submit" disabled={isButtonDisabled} on:click={submitReview}>Rate</button>
			</div>
		</form>
		{#if isButtonDisabled}
			<p class="warning-message">Text must be at least {minimumCharacters} characters</p>
		{/if}
	</div>

	<div class="ratings-body">
		<div class="total-ratings">{ratingsArray.length} Reviews</div>
		<div class="average-ratings">Average rating: {averageRatings}</div>
	</div>

	<div class="ratings-footer">
		{#each ratingsArray as rating (rating.id)}
			<div
				class="review-card
                {rating.fadeIn ? 'fade-in' : ''}
                {rating.fadeOut ? 'fade-out' : ''}
                "
			>
				<div class="review-card-rating">{rating.rating}</div>
				<p>{rating.text}</p>
				<button class="review-card-close-button" on:click={deleteRating} value={rating.id}>X</button
				>
			</div>
		{/each}
	</div>
</div>

<style>
	.ratings-container {
		padding: 10px;
		display: flex;
		flex-direction: column;
	}

	.ratings-header {
		padding: 10px;
		display: flex;
		gap: 5px;
		flex-direction: column;
		color: var(--text);
		background-color: var(--navbar);
		border: 1px solid var(--border);
		text-align: center;
		transition: var(--transition-time);
	}

	.ratings-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.ratings-form-list {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 4px;
		list-style: none;
		color: #000;
	}

	.ratings-form-list li {
		position: relative;
		margin: auto;
		width: 30px;
		height: 28px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		font-weight: bold;
	}

	.ratings-form-list li:hover {
		background: red;
	}

	.ratings-form-list li input,
	.ratings-form-list li label {
		appearance: none;
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: aliceblue;
		color: currentColor;
		font: inherit;
		border: 1px solid currentColor;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: 0.6s;
		user-select: none;
	}

	.ratings-form-list li label:hover {
		background-color: rgb(128, 128, 128);
	}

	.ratings-form-list li input:checked + label {
		background-color: #ff6a95;
	}

	.ratings-form-group {
		display: flex;
		justify-content: space-between;
		gap: 4px;
	}

	.ratings-form-group input {
		width: 100%;
		border: 1px solid black;
		outline: none;
		padding: 5px;
	}

	.ratings-form-group button {
		padding: 5px;
		color: var(--text);
		background-color: var(--background);
		border: 1px solid black;
		cursor: pointer;
		font-size: 1.6rem;
		transition: var(--transition-time);
	}

	.ratings-form-group button:hover {
		transform: scale(1.1);
	}

	.ratings-form-group button:disabled {
		color: var(--text);
		background-color: gray;
	}

	.ratings-form-group button:disabled:hover {
		transform: scale(1);
	}

	.warning-message {
		text-align: center;
	}

	.ratings-body {
		display: flex;
		justify-content: space-between;
		padding: 10px;
	}

	.ratings-footer {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.review-card {
		position: relative;
		background-color: var(--navbar);
		color: var(--text);
		padding: 30px;
		border: 1px solid var(--border);
		word-wrap: break-word;
		transition: var(--transition-time);
	}

	.review-card-rating {
		position: absolute;
		top: -1px;
		left: -1px;
		width: 30px;
		height: 30px;
		text-align: center;
		border: 1px solid var(--border);
		background-color: var(--background);
		transition: 0.3s;
	}

	.review-card-close-button {
		position: absolute;
		top: 8px;
		right: 10px;
		width: 25px;
		height: 25px;
		text-align: center;
		color: var(--text);
		cursor: pointer;
		background: none;
		transition: 0.5s;
		background: var(--background);
		border: 1px solid var(--border);
	}

	.review-card-close-button:hover {
		color: red;
	}

	.fade-in {
		animation: fadeIn ease 1s;
	}

	.fade-out {
		animation: fadeOut ease 1s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@media (min-width: 420px) {
		.ratings-form-list {
			display: grid;
			grid-template-columns: repeat(10, 1fr);
		}
		.ratings-form-list li {
			height: 33px;
			width: 34px;
		}
	}

	@media (min-width: 576px) {
		.ratings-form-list li {
			width: 42px;
			height: 40px;
		}
	}

	@media (min-width: 768px) {
		.ratings-container {
			padding: 40px;
		}
		.ratings-header {
			padding: 20px;
			gap: 20px;
		}

		.ratings-form {
			gap: 20px;
		}
		.ratings-form-group {
			gap: 10px;
		}

		.ratings-body {
			padding: 20px;
		}

		.ratings-footer {
			gap: 20px;
		}
	}

	@media (min-width: 992px) {
		.ratings-container {
			width: 80%;
			margin: auto;
		}
	}

	@media (min-width: 1200px) {
		.ratings-container {
			width: 1100px;
		}
		.ratings-form-list li {
			width: 45px;
			height: 44px;
		}
	}
</style>
