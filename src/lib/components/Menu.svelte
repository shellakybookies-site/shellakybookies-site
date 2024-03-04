<script>
	// @ts-ignore doesn't like importing yaml files
	import { metadata } from '$lib/content/menu.md';
</script>

<ul>
	<li>
		<details class="dropdown">
			<summary>{metadata.title}</summary>
			<ul dir="rtl">
				{#each metadata.links as link}
					<li><a href={link.url}>{link.label}</a></li>
				{/each}
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
