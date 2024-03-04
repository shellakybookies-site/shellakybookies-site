<script>
	import '@fontsource/vesper-libre/400.css';
	import '@fontsource/vesper-libre/500.css';
	import '@fontsource/vesper-libre/700.css';
	import '@fontsource/vesper-libre/900.css';
	import '@fontsource/metamorphous';
	import '@picocss/pico/css/pico.jade.css';
	import '@picocss/pico/css/pico.colors.css';
	import Menu from '$lib/components/Menu.svelte';
	import CalendarIcon from '$lib/components/CalendarIcon.svelte';
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Shellakybookies Galore!</title>
</svelte:head>

<header class="container">
	<nav>
		<ul>
			<li>
				<a href="{base}/">
					<h1 class="pico-color-jade-500">Shellakybookies</h1>
				</a>
			</li>
		</ul>
		<ul>
			<li>
				<a href="{base}/calendar">
					<CalendarIcon height="2.75rem" width="2.75rem" />
				</a>
			</li>
			<li>
				<Menu />
			</li>
		</ul>
	</nav>
</header>
<main class="container">
	<slot />
</main>

<style>
	:root {
		--pico-font-family-sans-serif: 'Vesper Libre';
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Metamorphous';
	}

	@media (max-width: 478px) {
		h1 {
			font-size: x-large;
		}
	}

	@media (max-width: 405px) {
		h1 {
			font-size: large;
		}
	}

	@media (max-width: 351px) {
		h1 {
			font-size: medium;
		}
	}

	@media (max-width: 333px) {
		h1 {
			font-size: small;
		}
	}

	h1 {
		margin-bottom: 0;
	}

	a {
		text-decoration: none;
	}
</style>
