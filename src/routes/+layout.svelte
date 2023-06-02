<script>
    import Navbar from '../components/Navbar.svelte';
</script>

<Navbar/>
<slot></slot>

<style>
    /*@import "../css/breakpoint.css";*/

    @font-face {
        /* font-family: "Roboto"; */
        /* src: url(/src/fonts/Roboto-Thin.ttf); */
        /*font-family: 'Roboto', sans-serif;*/
        /*src: url(/src/fonts/Poppins-Regular.ttf);*/
    }

    :global(*) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-weight: 400;
    }

    :root {
        --background: #464e56;
        --text: #fff;
        --border: black;
        --transition-time: 1s;
    }

    :global(.light-theme) {
        --background: #fff6ea;
        --text: rgba(0, 0, 0, 0.9);
    }

    :global(body) {
        /*height: 100vh;*/
        /*overflow: hidden;*/
        width: 100%;
        background-color: var(--background);
        transition: var(--transition-time);
        color: var(--text);
    }
</style>