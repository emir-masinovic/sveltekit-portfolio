<script>
	import logo from '../images/diamond.svg';
	import sun from '../images/sun.svg';
	import moon from '../images/moon.svg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isLightTheme = false;
	let activePage = '';

	onMount(() => {
		activePage = $page.url.pathname;
		isLightTheme = localStorage.getItem('theme') === 'light';
		updateTheme();
	});

	function toggleTheme() {
		isLightTheme = !isLightTheme;
		localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
		updateTheme();
	}

	function updateTheme() {
		if (isLightTheme) {
			document.body.classList.add('light-theme');
		} else {
			document.body.classList.remove('light-theme');
		}
	}

	function handleNavLinkClick(event) {
		const links = document.querySelectorAll('.navbar-links li a');
		links.forEach((link) => link.classList.remove('active'));
		event.target.classList.add('active');
	}
</script>

<nav class="navbar">
	<a href="https://github.com/emir-masinovic">
		<img alt="Logo" src={logo} />
	</a>
	<ul class="navbar-links">
		<li>
			<a href="/" class={activePage === '/' ? 'active' : ''} on:click={handleNavLinkClick}>Home</a>
		</li>
		<li>
			<a
				href="/projects"
				class={activePage === '/projects' || activePage.startsWith('/projects') === true
					? 'active'
					: ''}
				on:click={handleNavLinkClick}
				>Projects
			</a>
		</li>
		<li>
			<a
				href="/contact"
				class={activePage === '/contact' ? 'active' : ''}
				on:click={handleNavLinkClick}
				>Contact
			</a>
		</li>
	</ul>
	<button class="toggle-theme" on:click={toggleTheme}>
		{#if isLightTheme}
			<img alt="Moon" src={moon} class="moon" />
		{:else}
			<img alt="Sun" src={sun} class="sun" />
		{/if}
	</button>
</nav>

<style>
	:root {
		--navbar: #343a40;
		--link-faded: rgba(177, 177, 177, 0.5);
		--link-hover: rgba(234, 234, 234, 0.75);
		--logo: invert(1);
	}

	:global(.light-theme) {
		--navbar: #ebd8c3;
		--link-faded: rgba(0, 0, 0, 0.5);
		--link-hover: rgba(21, 21, 21, 0.9);
		--logo: invert(0);
	}

	.navbar {
		display: flex;
		height: 80px;
		justify-content: space-between;
		padding: 0 20px 0 20px;
		align-items: center;
		border-bottom: 1px solid var(--border);
		background-color: var(--navbar);
		transition: var(--transition-time);
	}

	.navbar img {
		filter: var(--logo);
		transition: var(--transition-time);
		scale: 1.2;
	}

	.navbar-links {
		display: flex;
		gap: 20px;
		font-size: 1.8rem;
		list-style: none;
	}

	.navbar-links li a {
		align-items: center;
		color: var(--link-faded);
		text-decoration: none;
		transition: var(--transition-time);
		font-weight: bold;
	}

	.navbar-links li a:hover {
		color: var(--link-hover);
	}

	.navbar-links li a.active {
		color: var(--text);
		font-weight: bold;
	}

	.toggle-theme {
		display: flex;
		padding: 5px;
		border: 1px solid var(--text);
		border-radius: 100%;
		scale: 1.2;
		background-color: transparent;
		cursor: pointer;
		transition: var(--transition-time);
	}

	.toggle-theme:hover {
		background-color: var(--background);
		filter: invert(1);
		scale: 1.1;
	}
</style>
