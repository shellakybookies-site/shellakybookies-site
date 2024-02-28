<script>
	import { page } from '$app/stores';

	let dates = $state($page.data.dates);
	let components = $state($page.data.components);

	let now = $state();

	/** @param {Date} date */
	function date_to_day_str(date) {
		return (
			date &&
			date
				.toLocaleString('en-CA', {
					timeZone: 'America/Edmonton'
				})
				.split(',')[0]
				.split('/')
				.reverse()
				.join('-')
		);
	}

	let today_formatted = $derived(date_to_day_str(now));

	let next_thursday = $derived.by(() => {
		const thursday = 4;
		const next_thurs = new Date(today_formatted);
		next_thurs.setDate(
			next_thurs.getDate() + ((thursday + (7 - next_thurs.getDay())) % 7)
		);
		return date_to_day_str(next_thurs);
	});

	let dynamic_component = $derived(
		// @ts-ignore
		today_formatted && components[next_thursday]
	);

	$effect(() => {
		// grab date on load
		now = new Date();
	});
</script>

<article>
	<h4 dir="rtl">Next Session: {next_thursday}</h4>
	{#if dynamic_component}
		<svelte:component this={dynamic_component} />
	{:else}
		<p>Same plans as usual</p>
	{/if}
</article>
