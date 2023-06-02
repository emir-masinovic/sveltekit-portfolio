<div class="home-container">
    <div class="home-item">
        <img src={emir} alt="" class="img-fluid"/>
    </div>
    <div class="home-item">
        <h1>Emir Masinovic</h1>
        <p>I'm working on combining website development and computer graphics.</p>

        <!--        <div class="cube">-->
        <!--            <div class="top"></div>-->
        <!--            <div class="right"></div>-->
        <!--            <div class="bottom"></div>-->
        <!--            <div class="left"></div>-->
        <!--            <div class="front"></div>-->
        <!--            <div class="back"></div>-->
        <!--        </div>-->
        <!--        <button on:click={changeAnimation} value="stop" class="button">Stop</button>-->
        <!--        <button on:click={changeAnimation} value="left">Left</button>-->
        <!--        <button on:click={changeAnimation} value="right">Right</button>-->
    </div>
</div>


<script>
    import emir from "../images/emir.jpg"



    // function changeAnimation(event) {
    //     event.preventDefault();
    //     let action = event.target.value;
    //     switch (action) {
    //         case "stop":
    //             document.body.classList.toggle("cube-stop");
    //             break
    //         case "left":
    //             document.body.classList.toggle("cube-left");
    //             break
    //         case "right":
    //             document.body.classList.toggle("cube-right");
    //             break
    //     }
    // }
</script>


<style>

    #renderCanvas {
        width: 100%;
        height: 100%;
        touch-action: none;
        border: 2px solid black;
    }

    #canvasZone {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    :root {
        --playState: running;
        --left: 0deg;
        --right: 0deg;
    }

    :global(.cube-stop) {
        --playState: paused;
    }

    :global(.cube-left) {
        --left: -360deg;
    }

    :global(.cube-right) {
        --right: 360deg;
    }


    .home-container {
        margin: 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: center;
        line-height: 1.6;
    }

    .img-fluid {
        border-radius: 50%;
        width: 90%;
    }

    .cube {
        --cube-size: 5rem;
        --cube-side: 2.5rem;
        transform-style: preserve-3d;
        position: relative;
        animation: spin 100s infinite linear var(--playState);
        width: var(--cube-size);
        height: var(--cube-size);
        margin: var(--cube-size) auto;
    }

    @media (min-width: 576px) {
        .img-fluid {
            width: 80%;
        }
    }

    @media (min-width: 700px) {
        .img-fluid {
            width: 70%;
        }

        .cube {
            --cube-size: 6rem;
            --cube-side: 3rem;
        }
    }

    @media (min-width: 768px) {

        .home-container {
            flex-direction: row;
            margin: 0;
            height: 80vh;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
        }

        .home-item {
            width: 50%;
        }

        .img-fluid {
            width: 100%;
        }

        .cube {
            --cube-size: 5rem;
            --cube-side: 2.5rem;
        }
    }

    @media (min-width: 992px) {
        .img-fluid {
            width: 90%;
        }
    }

    @media (min-width: 1200px) {

        .home-item {
            width: 40%;
        }

        .img-fluid {
            width: 100%;
        }

        .cube {
            --cube-size: 6rem;
            --cube-side: 3rem;
        }
    }

    @media (min-width: 1400px) {
        .home-item {
            line-height: 2;
        }

        .img-fluid {
            width: 80%;
        }
    }


    .cube div {
        width: var(--cube-size);
        height: var(--cube-size);
        line-height: var(--cube-size);
        text-align: center;
        box-shadow: inset 0px 0px 0px 1px rgba(10, 0, 0, 0.8);
        /* background: rgba(190, 0, 0, 0.6); */
        display: block;
        position: absolute;
    }

    .cube div.top {
        transform: rotateX(90deg);
        margin-top: calc(-1 * var(--cube-side));
        background: rgba(0, 255, 0, 0.5);
    }

    .cube div.right {
        transform: rotateY(90deg);
        margin-left: var(--cube-side);
        background: rgba(0, 255, 255, 0.6);
    }

    .cube div.bottom {
        transform: rotateX(-90deg);
        margin-top: var(--cube-side);
        background: rgba(255, 0, 0, 0.6);
    }

    .cube div.left {
        transform: rotateY(-90deg);
        margin-left: calc(-1 * var(--cube-side));
        background: rgba(125, 0, 255, 0.6);
    }

    .cube div.front {
        transform: translateZ(var(--cube-side));
        background: rgba(255, 125, 0, 0.6);
    }

    .cube div.back {
        transform: translateZ(calc(-1 * var(--cube-side))) rotateX(180deg);
        background: rgba(255, 125, 125, 0.6);
    }

    @keyframes spin {

        /*0% {*/
        /*    transform: rotateX(0) rotateY(0);*/
        /*}*/
        /*100% {*/
        /*    transform: rotateX(0) rotateY(calc(var(--left) + var(--right)));*/
        /*}*/

        0% {
            transform: rotateX(-20deg) rotateY(0deg *sin(0deg));
        }
        100% {
            transform: rotateX(-2000deg) rotateY(-3600deg);
        }
    }

</style>