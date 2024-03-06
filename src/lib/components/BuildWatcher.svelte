<script>
	import BuildWatcher from '$lib/utils/build_watcher.svelte';

	/** @type {BuildWatcher} */
	let watcher = $state(new BuildWatcher());

	/** @type {"off" | "polite"} */
	let aria_live = $state('off');

	let readable_status = $derived(watcher.status.replace('_', ''));

	let aria_label = $derived(
		watcher &&
			`Site build is ${readable_status}${watcher.conclusion && `, build ${watcher.conclusion}`}`
	);

	let status_color = $derived.by(() => {
		let color;
		switch (watcher.conclusion) {
			case 'success':
				color = 'green';
				break;
			case 'failure':
				color = 'red';
				break;
			default:
				color = 'yellow';
		}
		return `var(--pico-color-${color}-500)`;
	});

	$effect(() => {
		watcher.update();
	});

	function onclick() {
		watcher.update();
	}
</script>

<button
	{onclick}
	style:background-color={status_color}
	style:border-color={status_color}
>
	<small role="status" aria-live={aria_live} aria-label={aria_label}>
		{watcher && watcher.status}
	</small>
</button>
<span aria-busy={watcher.fetching}></span>
