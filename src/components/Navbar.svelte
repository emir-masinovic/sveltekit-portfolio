<script>
	import logo from '../images/diamond.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let activePage = '';
	let isMenuActive = false;
	let isLightTheme = false;
	let isDesktop = false;

	onMount(() => {
		activePage = $page.url.pathname;
		isLightTheme = localStorage.getItem('theme') === 'light';
		updateTheme();

		isDesktop = window.innerWidth >= 700;
		window.addEventListener('resize', handleResize);
	});

	function handleResize() {
		isDesktop = window.innerWidth >= 700;
	}

	function toggleMenu() {
		isMenuActive = !isMenuActive;
		if (isMenuActive) {
			document.body.classList.add('menu-active');
		} else {
			document.body.classList.remove('menu-active');
		}
	}

	function toggleTheme() {
		isLightTheme = !isLightTheme;
		localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
		updateTheme();
	}

	function updateTheme() {
		const favicon = document.querySelector('[rel=icon]');
		if (isLightTheme) {
			favicon.setAttribute('href', '/faviconLight.svg');
			document.body.classList.add('light-theme');
		} else {
			favicon.setAttribute('href', '/favicon.svg');
			document.body.classList.remove('light-theme');
		}
	}

	function handleNavLinkClick(event) {
		const links = document.querySelectorAll('nav ul li a');
		links.forEach((link) => link.classList.remove('active'));
		event.target.classList.add('active');
	}
</script>

<nav>
	<!-- <button id="hamburger-button" on:click={toggleMenu}>≡</button> -->
	<button id="hamburger-button" on:click={toggleMenu}>
		<div />
		<div />
		<div />
	</button>

	<a class="logo" href="https://github.com/emir-masinovic">
		<img alt="Logo" src={logo} />
	</a>

	<ul class:active={isMenuActive}>
		<li>
			<a
				tabindex={isDesktop || isMenuActive ? '0' : '-1'}
				href="/"
				class={activePage === '/' ? 'active' : ''}
				on:click={handleNavLinkClick}
				on:click={toggleMenu}>Home</a
			>
		</li>
		<li>
			<a
				tabindex={isDesktop || isMenuActive ? '0' : '-1'}
				href="/projects"
				class={activePage === '/projects' || activePage.startsWith('/projects') === true
					? 'active'
					: ''}
				on:click={handleNavLinkClick}
				on:click={toggleMenu}>Projects</a
			>
		</li>
		<li>
			<a
				tabindex={isDesktop || isMenuActive ? '0' : '-1'}
				href="/contact"
				class={activePage === '/contact' ? 'active' : ''}
				on:click={handleNavLinkClick}
				on:click={toggleMenu}>Contact</a
			>
		</li>
	</ul>
	<button id="theme-button" on:click={toggleTheme}>
		<div />
	</button>
</nav>

<style>
	:root {
		--logo: invert(1);
		--navbar-background: #343a40;
		--hamburger-hover: white;
		--theme-button-background: #7b7b7b;
		--theme-button-border: 1px solid #464e56;
		--theme-button-border-hover: 1px solid #e6e6e6;
		--theme-button-position: translate(2px, 0%);
		--theme-button-div-background: #464e56;
		--theme-button-icon: url('../images/sun.svg');
	}

	:global(.light-theme) {
		--logo: invert(0);
		--navbar-background: #ebd8c3;
		--hamburger-hover: black;
		--theme-button-background: #fff6ea;
		--theme-button-border: 1px solid #b0b0b0;
		--theme-button-border-hover: 1px solid #212121;
		--theme-button-position: translate(30px, 0%);
		--theme-button-div-background: #ebd8c3;
		--theme-button-icon: url('../images/moon.svg');
	}

	:global(.menu-active) {
		--line-1-rotate: -45deg;
		--line-2-display: none;
		--line-3-rotate: 45deg;
		--line-position: absolute;
	}

	nav {
		position: fixed;
		z-index: 100;
		height: 80px;
		margin-top: -80px;
		width: 100%;
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		background-color: var(--navbar-background);
		transition: var(--transition-time);
		box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.75);
	}

	:global(body) {
		margin-top: 80px;
	}

	.logo {
		display: none;
		filter: var(--logo);
		transition: var(--transition-time);
		width: 20px;
		height: 20px;
		align-self: center;
	}

	.logo img {
		height: 100%;
		width: 100%;
	}

	.logo:hover {
		rotate: 90deg;
	}

	#hamburger-button {
		display: flex;
		position: relative;
		flex-direction: column;
		align-self: center;
		width: 40px;
		height: 28px;
		padding: 5px;
		gap: 6px;
		border: none;
		cursor: pointer;
		transition: var(--transition-time);
		background-color: var(--navbar-background);
		justify-content: center;
		align-content: center;
	}

	#hamburger-button div {
		width: 30px;
		height: 2px;
		background-color: var(--text);
		transition: var(--transition-time);
	}

	#hamburger-button div:nth-child(1) {
		position: var(--line-position);
		rotate: var(--line-1-rotate);
	}
	#hamburger-button div:nth-child(2) {
		display: var(--line-2-display);
	}
	#hamburger-button div:nth-child(3) {
		position: var(--line-position);
		rotate: var(--line-3-rotate);
	}

	#hamburger-button:hover {
		color: var(--hamburger-hover);
	}

	#theme-button {
		height: 30px;
		width: 60px;
		align-self: center;
		cursor: pointer;
		border-radius: 15px;
		border: var(--theme-button-border);
		transition: border 0.3s, background-color var(--transition-time);
		background-color: var(--theme-button-background);
	}

	#theme-button:hover {
		border: var(--theme-button-border-hover);
	}

	#theme-button div {
		height: 26px;
		width: 26px;
		padding: 4px;
		border-radius: 50%;
		transition: 0.5s ease-out;
		content: var(--theme-button-icon);
		transform: var(--theme-button-position);
		background-color: var(--theme-button-div-background);
	}

	nav ul {
		position: fixed;
		inset: 0;
		z-index: 100;
		height: calc(100% - 80px);
		transform: translate(0%, -100%);
		display: flex;
		flex-direction: column;
		gap: 20px;
		justify-content: center;
		text-align: center;
		list-style: none;
		background-color: var(--background);
		transition: var(--transition-time);
	}

	nav ul.active {
		transform: translate(0%, 80px);
	}

	nav ul li a {
		font-size: 3rem;
		padding: 5px;
		color: var(--text);
		text-decoration: none;
		background: linear-gradient(var(--text), var(--text));
		background-size: 0% 1px;
		background-position: 50% 100%;
		background-repeat: no-repeat;
		transition: background-size 0.5s, color var(--transition-time);
	}

	nav ul li a:hover {
		background-size: 100% 0.1em;
	}

	nav ul li a.active {
		color: red;
		background: linear-gradient(red, red);
		background-size: 0% 1px;
		background-position: 50% 100%;
		background-repeat: no-repeat;
		transition: background-size 0.5s;
	}

	nav ul li a.active:hover {
		background-size: 100% 0.1em;
	}

	@media (min-width: 700px) {
		:global(body) {
			margin-top: 0;
		}
		nav {
			position: initial;
			margin-top: 0;
		}
		nav ul,
		nav ul.active {
			position: initial;
			flex-direction: row;
			height: 100%;
			gap: 10px;
			align-items: center;
			transform: translate(0%);
			background-color: var(--navbar-background);
		}
		nav ul li a {
			font-size: 2rem;
		}

		#hamburger-button {
			display: none;
		}

		.logo {
			display: initial;
		}
	}
</style>
