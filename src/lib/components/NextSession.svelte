<script>
	import { page } from '$app/stores';
	import { in_calgary, formate_date } from '$lib/utils/date-utils';
	// @ts-ignore
	import Placeholder from '$lib/content/placeholder.md';

	let components = $state($page.data.components);

	let browser_now = $state();
	let calgary_now = $derived(browser_now && in_calgary(browser_now));

	/** @param {Date} date */
	function get_next_thursday(date) {
		// Make sure the input is a Date object
		if (!(date instanceof Date)) {
			throw new Error('Input must be a Date object');
		}

		const dayOfWeek = date.getDay(); // Get the day of the week (0-6)

		// Calculate how many days to add to get to the next Thursday.
		// If today is Thursday (4) don't add any days, otherwise calculate
		// the difference
		let daysToAdd = dayOfWeek === 4 ? 0 : (4 - dayOfWeek + 7) % 7;

		// Create a new Date object for the next Thursday
		const nextThursday = new Date(date);
		nextThursday.setDate(date.getDate() + daysToAdd);

		return nextThursday;
	}

	let today_formatted = $derived(calgary_now && formate_date(calgary_now));

	let next_thursday = $derived(
		calgary_now && formate_date(get_next_thursday(calgary_now))
	);

	let dynamic_component = $derived(
		today_formatted && next_thursday && components[next_thursday]
	);

	$effect(() => {
		// grab date on load
		browser_now = new Date();
	});
</script>

<article>
	<h4 dir="rtl">Next Session: {next_thursday}</h4>
	{#if dynamic_component}
		<svelte:component this={dynamic_component} />
	{:else}
		<Placeholder />
	{/if}
</article>
