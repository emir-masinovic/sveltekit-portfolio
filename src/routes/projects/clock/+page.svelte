<script>
    import {onMount} from 'svelte';

    let clock, hour, minute, second;
    let intervalId;

    onMount(() => {
        const remValue = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const chooseShortWindowSide = Math.min(window.innerWidth, window.innerHeight) - remValue;
        const deg = 6;

        clock.style.height = (chooseShortWindowSide - (2 * remValue) - 80) + "px";
        clock.style.width = (chooseShortWindowSide - (2 * remValue) - 80) + "px";

        hour.style.height = clock.offsetWidth / 4 + "px"
        hour.style.width = 0.6 + "rem"
        minute.style.height = clock.offsetWidth / 2.5 + "px"
        minute.style.width = 0.4 + "rem"
        second.style.height = clock.offsetWidth / 2 - 8 + "px"
        second.style.width = 0.3 + "rem"

        intervalId = setInterval(() => {
            const date = new Date();
            const hourDate = date.getHours() * 30;
            const minuteDate = date.getMinutes() * deg;
            const secondDate = date.getSeconds() * deg;

            hour.style.transform = `rotateZ(${hourDate + (minuteDate / 12)}deg)`;
            minute.style.transform = `rotateZ(${minuteDate}deg)`;
            second.style.transform = `rotateZ(${secondDate}deg)`;
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    });
</script>

<div class="clock-container">
    <div class="clock" bind:this={clock}>
        <div class="center"></div>
        <div class="hour" bind:this={hour}></div>
        <div class="minute" bind:this={minute}></div>
        <div class="second" bind:this={second}></div>
    </div>
</div>


<style>

    .clock-container {
        height: calc(100vh - 80px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .clock {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        border: .35rem solid black;
        background-color: lightblue;
        border-radius: 50%;
    }

    .center {
        width: 1rem;
        height: 1rem;
        background-color: cornflowerblue;
        border-radius: 50%;
        z-index: 1;
    }

    .hour, .minute, .second {
        position: absolute;
        top: 50%;
        rotate: 180deg;
        -webkit-transform-origin: top;
        -ms-transform-origin: top;
        transform-origin: top;
        background-color: black;
        border-radius: 0 0 .4rem .4rem;
    }

    .minute {
        background-color: green;
    }

    .second {
        background-color: red;
    }
</style>