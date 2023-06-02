<div class="card-container">
    <div class="card-head">
        <img src={imageSource} alt="" class="img-card"/>
    </div>
    <div class="card-body">
        <h2>{title}</h2>
        <p>{bodyContent}</p>
    </div>
    <div class="card-footer">
        <Button text={buttonText} buttonLink={buttonLink}/>
    </div>
</div>

<script>
    import Button from "./Button.svelte"

    export let title, imageSource, bodyContent, buttonText, buttonLink;
</script>


<style>
    .card-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 280px;
        background: var(--navbar);
        border: 1px solid black;
        transition: 0.2s;
        line-height: 1.5;
    }

    .card-head {
        height: 200px;
    }

    .img-card {
        width: 100%;
        height: 100%;
    }

    .card-body {
        height: 200px;
        padding: 0.5rem 1rem;
        border-top: 1px solid black;
    }

    .card-footer {
        display: flex;
        padding: 1rem;
    }
</style>