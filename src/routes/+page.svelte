<div class="home-container">
    <div class="home-item">
        <img src={emir} alt="" class="img-fluid"/>
    </div>
    <div class="home-item">
        <h1>Emir Masinovic</h1>
        <p>I'm working on combining website development and computer graphics.</p>

        <div class="cube" bind:this={cube}>
            <div class="top"></div>
            <div class="right"></div>
            <div class="bottom"></div>
            <div class="left"></div>
            <div class="front"></div>
            <div class="back"></div>
        </div>

        {#if showFps}
            <div class="info">FPS: {fps} |
                Speed: {Math.sqrt(Math.pow(rotationSpeedX, 2) + Math.pow(rotationSpeedY, 2)).toFixed(2)}</div>
        {/if}

        <div class="buttons">
            <button on:click={() => rotate('up')}>Up</button>
            <button on:click={() => rotate('left')}>Left</button>
            <button on:click={() => rotate('right')}>Right</button>
            <button on:click={() => rotate('down')}>Down</button>
            <button on:click={speedUp}>Speed Up</button>
            <button on:click={slowDown}>Slow Down</button>
            <button on:click={stop}>Stop</button>
            <button on:click={randomize}>Randomize</button>
            <button on:click={() => showFps = !showFps}>Toggle FPS</button>
        </div>
    </div>
</div>


<script>
    import emir from "../images/emir.jpg"

    let cube;
    let rotationSpeedX = 0;
    let rotationSpeedY = 0;
    let currentRotation = {x: 0, y: 0};
    let intervalId = null;

    let showFps = true;
    let fps = 0;
    let lastDrawTime = Date.now();
    const intervalDelay = 10;

    function rotateCube() {
        if (intervalId !== null) clearInterval(intervalId);

        intervalId = setInterval(function () {
            let now = Date.now();
            let delta = now - lastDrawTime;
            fps = Math.round(1000 / delta);
            lastDrawTime = now;

            currentRotation.x += rotationSpeedX;
            currentRotation.y += rotationSpeedY;
            cube.style.transform = `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg)`;
        }, intervalDelay);
    }

    function rotate(direction) {
        if (direction === 'left' || direction === 'right') rotationSpeedY += direction === 'left' ? -1 : 1;
        if (direction === 'up' || direction === 'down') rotationSpeedX += direction === 'up' ? -1 : 1;
        rotateCube();
    }

    function stop() {
        clearInterval(intervalId);
        intervalId = null;
        rotationSpeedX = 0;
        rotationSpeedY = 0;
    }

    function speedUp() {
        rotationSpeedX *= 2;
        rotationSpeedY *= 2;
        rotateCube();
    }

    function slowDown() {
        rotationSpeedX /= 2;
        rotationSpeedY /= 2;
        rotateCube();
    }

    function randomize() {
        const sides = cube.querySelectorAll('div');
        sides.forEach(side => {
            side.style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        });
    }
</script>


<style>

    .buttons {
        display: grid;
        grid-template-areas:
            "up up up up up"
            "left . . . right"
            "down down down down down"
            "speedUp speedUp speedUp speedUp speedUp"
            "slowDown slowDown slowDown slowDown slowDown"
            "stop stop stop stop stop"
            "randomize randomize randomize randomize randomize"
            "fps fps fps fps fps";
        gap: 0.3rem;
        justify-content: center;
        align-items: center;
    }

    .buttons button {
        border: 1px solid black;
        color: var(--text);
        padding: 0.3rem;
        background-color: var(--navbar);
        transition: var(--transition-time);
    }

    .buttons button:hover {
        background-color: var(--link-faded);
    }

    .buttons > button:nth-child(1) {
        grid-area: up;
    }

    .buttons > button:nth-child(2) {
        grid-area: left;
    }

    .buttons > button:nth-child(3) {
        grid-area: right;
    }

    .buttons > button:nth-child(4) {
        grid-area: down;
    }

    .buttons > button:nth-child(5) {
        grid-area: speedUp;
    }

    .buttons > button:nth-child(6) {
        grid-area: slowDown;
    }

    .buttons > button:nth-child(7) {
        grid-area: stop;
    }

    .buttons > button:nth-child(8) {
        grid-area: randomize;
    }

    .buttons > button:nth-child(9) {
        grid-area: fps;
    }

    .info {
        text-align: center;
        margin-top: 10px;
    }

    .fps {
        text-align: center;
        padding: 1rem;
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
        /*animation: spin 10s infinite linear;*/
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
        /*    transform: rotateX(-20deg) rotateY(0deg *sin(0deg));*/
        /*}*/
        /*100% {*/
        /*    transform: rotateX(-2000deg) rotateY(-3600deg);*/
        /*}*/
    }

</style>