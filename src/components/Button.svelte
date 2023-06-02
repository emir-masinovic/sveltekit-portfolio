<a href={buttonLink} class="button">{text}</a>

<script>
    export let text, buttonLink;
</script>

<style>
    :root {
        --button-shadow: black;
    }

    :global(.light-theme ) {
        --button-shadow: gray;
    }

    .button {
        padding: 0.6rem;
        font-weight: bold;
        text-decoration: none;
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