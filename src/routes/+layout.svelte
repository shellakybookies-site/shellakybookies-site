<script>
	import '@fontsource/vesper-libre/400.css';
	import '@fontsource/vesper-libre/500.css';
	import '@fontsource/vesper-libre/700.css';
	import '@fontsource/vesper-libre/900.css';
	import '@fontsource/metamorphous';
	import '../app.css';
</script>

<header class="bg-neutral-800">
	<h1 class="h1 py-3 text-center text-2xl font-light text-gold-600">
		The Shellakybookies
	</h1>
	<nav></nav>
</header>

<main class="grow bg-green-900">
	<slot />
</main>

<footer class="bg-neutral-800">Fuck</footer>

<style lang="postcss">
	:global(html) {
		color-scheme: dark light;
	}

	:global(body) {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}
</style>
