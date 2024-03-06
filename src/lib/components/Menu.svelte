<script>
	// @ts-ignore doesn't like importing md files
	import { metadata } from '$lib/content/menu.md';
	// import BuildWatcher from './BuildWatcher.svelte';

	let open = $state(false);

	function onclick() {
		open = false;
	}
</script>

<ul>
	<li>
		<details class="dropdown" bind:open>
			<summary>{metadata.title}</summary>
			<ul dir="rtl">
				{#each metadata.links as link}
					<li><a href={link.url} {onclick}>{link.label}</a></li>
				{/each}
				<!-- <li dir="ltr"><BuildWatcher /></li> -->
			</ul>
		</details>
	</li>
</ul>

<style>
	ul {
		font-family: system-ui, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
			Helvetica, Arial, 'Helvetica Neue', sans-serif,
			var(--pico-font-family-emoji);
	}
</style>
