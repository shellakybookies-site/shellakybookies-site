<script>
	import '@picocss/pico/css/pico.jade.css';
	import '@picocss/pico/css/pico.colors.css';
	import Menu from '$lib/components/Menu.svelte';
</script>

<header class="container">
	<nav>
		<ul>
			<strong class="pico-color-jade-500">Shellakybookies</strong>
		</ul>
		<Menu />
	</nav>
</header>
<main class="container">
	<slot />
</main>
