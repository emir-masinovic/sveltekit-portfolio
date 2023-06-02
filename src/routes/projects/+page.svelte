<div class="project-container">
    <!--    <Card title="Clicker" imageSource={leaderboard} bodyContent="Clickity-clack!" buttonText="Play"-->
    <!--          buttonLink="/projects/clicker"/>-->
    <Card title="Feedback Ratings" imageSource={feedback} bodyContent="Rate a movie!" buttonText="Link"
          buttonLink="/projects/ratings"/>
    <Card title="Clock" imageSource={clock} bodyContent="" buttonText="Link"
          buttonLink="/projects/clock"/>
    <Card title="Calculator" imageSource={calculator} bodyContent="" buttonText="Link"
          buttonLink="http://172.104.153.230:5000/"/>
    <!--    <Card title="Pokemon" imageSource={pokemon} bodyContent="Pokedex, but without images" buttonText="Link"-->
    <!--          buttonLink="/projects/pokemon"/>-->
    <Card title="FLOW" imageSource={flow} bodyContent="Background flow" buttonText="Link"
          buttonLink="/projects/flow"/>
    <Card title="Parallax Effect" imageSource={parallax} bodyContent="Illusion of depth" buttonText="Link"
          buttonLink="http://172.104.153.230:5001/"/>
    <!--    <Card title="Tic Tac Toe" imageSource={ttt} bodyContent="Work in progress" buttonText="Play"-->
    <!--          buttonLink="/projects/tictactoe"/>-->

    <Card title="Babylon" imageSource={babylon} bodyContent="Work in progress" buttonText="Play"
          buttonLink="/projects/babylonium"/>

</div>

<script>
    // import leaderboard from "../../images/leaderboard.jpg"
    import Card from "../../components/Card.svelte"
    import feedback from "../../images/feedback.jpg"
    import clock from "../../images/clock.png"
    import parallax from "../../images/parallax.png"
    import calculator from "../../images/calculator.png"
    // import ttt from "../../images/ttt.jpg"
    // import pokemon from "../../images/pokemon.jpg"
    import flow from "../../images/flow.png"
    import babylon from "../../images/babylon.png"
</script>

<style>
    .project-container {
        display: flex;
        height: calc(100vh - 100px);
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        flex-wrap: wrap;
    }
</style>