<nav class="navbar">
    <div class="logo"><img alt="Logo" src={logo}/></div>
    <ul class="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
    <button class="toggle-theme sun" on:pointerdown={changeTheme}>
        <img alt="Logo" src={sun}/>
    </button>
    <button class="toggle-theme moon" on:pointerdown={changeTheme}>
        <img alt="Logo" src={moon}/>
    </button>
</nav>

<script>
    import logo from '../images/baklava.svg';
    import sun from '../images/sun.svg';
    import moon from '../images/moon.svg';

    function changeTheme(event) {
        event.preventDefault();
        document.body.classList.toggle("light-theme");
    }
</script>

<style>
    :root {
        --navbar: #343a40;
        --link-faded: rgba(177, 177, 177, 0.5);
        --link-hover: rgba(234, 234, 234, 0.75);
        --sun-color: #fff;
        --moon-color: transparent;
        --sun-visibility: flex;
        --moon-visibility: none;
        --logo: invert(1);
    }

    :global(.light-theme ) {
        --logo: invert(0);
        --navbar: #ebd8c3;
        --link-faded: rgba(0, 0, 0, 0.5);
        --link-hover: rgba(21, 21, 21, 0.9);
        --sun-color: transparent;
        --moon-color: rgba(0, 0, 0, 0.9);
        --sun-visibility: none;
        --moon-visibility: flex;
    }

    .navbar {
        display: flex;
        height: 80px;
        justify-content: space-around;
        align-items: center;
        border-bottom: 1px solid var(--border);
        background-color: var(--navbar);
        transition: var(--transition-time);
    }

    .navbar-links {
        display: flex;
        gap: 1rem;
        color: var(--text);
        font-size: 1.1rem;
        list-style: none;
    }

    .navbar-links li a {
        display: flex;
        align-items: center;
        color: var(--link-faded);
        text-decoration: none;
        transition: var(--transition-time);
    }

    .navbar-links li a:hover {
        color: var(--link-hover);
        transition: var(--transition-time);
    }

    .navbar-links li.active a {
        color: var(--text);
        font-weight: bold;
    }

    .logo img {
        filter: var(--logo);
        transition: var(--transition-time);
    }

    .sun,
    .moon {
        display: var(--sun-visibility);
        height: 1.2rem;
        width: 1.2rem;
        border: none;
        background-color: transparent;
        filter: var(--logo);
        cursor: pointer;
        transition: var(--transition-time);
    }

    .sun img,
    .moon img {
        height: 100%;
        width: 100%;
    }

    .moon {
        display: var(--moon-visibility);
    }

    .sun:hover,
    .moon:hover {
        scale: 1.2;
    }

    @media (min-width: 576px) {
        .navbar {
            justify-content: space-between;
            padding: 1rem;
        }

        .navbar-links {
            gap: 2rem;
            font-size: 1.2rem;
        }
    }
</style>