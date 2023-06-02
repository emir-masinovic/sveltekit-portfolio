<script>
    // import {onMount} from 'svelte';
    // import {afterUpdate} from 'svelte';

    let pokemon = [];
    let currentPageUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10';
    let nextPageUrl;
    let prevPageUrl;
    let loading = true;

    // onMount(() => {
    //     let cancel = null;
    //     setLoading(true);
    //
    //     fetch(currentPageUrl)
    //         .then(response => response.json())
    //         .then(data => {
    //             setLoading(false);
    //             setNextPageUrl(data.next);
    //             setPrevPageUrl(data.previous);
    //             setPokemon(data.results.map(p => p.name));
    //         })
    //         .catch(error => {
    //             setLoading(false);
    //             console.error(error);
    //         });
    //
    //     return () => {
    //         cancel && cancel();
    //     };
    // });
    //
    // afterUpdate(() => {
    //     console.log('pokemon:', $pokemon);
    // });
    //
    // const setLoading = (value) => {
    //     loading = value;
    // };
    //
    // const setNextPageUrl = (url) => {
    //     nextPageUrl = url;
    // };
    //
    // const setPrevPageUrl = (url) => {
    //     prevPageUrl = url;
    // };
    //
    // const setPokemon = (data) => {
    //     pokemon = data;
    // };

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };
</script>

{#if loading}
    <div class="loader-container">
        <div class="spinner"></div>
    </div>
{:else}
    <div class="pokemon-card">
        <h2></h2>
        <div class="pokemon-card-body">
            {#each pokemon as p (p)}
                <div class="pokemon-card-body-div">{capitalize(p)}</div>
            {/each}
        </div>
        <div class="pokemon-card-buttons">
            {#if prevPageUrl !== null}
                <button on:click={() => (currentPageUrl = prevPageUrl)}>Previous</button>
            {/if}
            {#if nextPageUrl !== null}
                <button on:click={() => (currentPageUrl = nextPageUrl)}>Next</button>
            {/if}
        </div>
    </div>
{/if}

<style>
    .loader-container {
        width: 100%;
        height: 600px;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }

    .spinner {
        width: 64px;
        height: 64px;
        border: 8px solid;
        border-color: #3d5af1 transparent #3d5af1 transparent;
        border-radius: 50%;
        animation: spin-anim 1.2s linear infinite;
    }

    @keyframes spin-anim {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @font-face {
        font-family: "Pokemon";
        /*src: url(/src/fonts/Pokemon\ Solid.ttf);*/
    }

    .pokemon-card {
        --border-pokemon: #0a285f;
        width: 300px;
        margin: 20px auto;
        border: 10px solid var(--border-pokemon);
        background-color: #ffcc00;
        border-radius: 15px;
        color: #000;
        box-shadow: -10px 10px 0px black;
        text-align: center;
        font-family: "Pokemon" !important;
    }

    .pokemon-card h2 {
        margin: 0;
        height: 100px;
        background: url("/src/image/pokemon.png") no-repeat center;
        background-size: 200px 100%;
        border-bottom: 2px solid var(--border-pokemon);
    }

    .pokemon-card-body-div {
        padding: 5px 0px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pokemon-card-buttons {
        margin: 10px auto;
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-content: center;
    }

    .pokemon-card-buttons button {
        font-family: "Pokemon";
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
        box-shadow: -2px 2px 0px black;
        user-select: none;
    }

    .pokemon-card-buttons button:hover {
        background-color: var(--border-pokemon);
        color: #ffcc00;
        transform: scale(0.98);
    }

    @media (max-width: 576px) {
        .pokemon-card {
            width: 80%;
        }
    }

</style>

